const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '12345',
  DB_NAME = 'product_listing_db'
} = process.env;

async function setupDatabase() {
  let connection;
  
  try {
    // Create connection without database
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    console.log('✅ Connected to MySQL server');

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`✅ Database '${DB_NAME}' created or already exists`);

    // Use the database
    await connection.query(`USE \`${DB_NAME}\``);
    console.log(`✅ Using database '${DB_NAME}'`);

    // Read and execute schema file
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schemaSQL = await fs.readFile(schemaPath, 'utf8');
    
    // Split SQL statements and execute each one
    const statements = schemaSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement + ';');
      }
    }
    console.log('✅ Database schema created successfully');

    // Read and execute migration files
    const migrationsDir = path.join(__dirname, '..', 'database', 'migrations');
    const migrationFiles = await fs.readdir(migrationsDir);
    
    // Sort migration files by number
    migrationFiles.sort();
    
    for (const file of migrationFiles) {
      if (file.endsWith('.sql')) {
        const migrationPath = path.join(migrationsDir, file);
        const migrationSQL = await fs.readFile(migrationPath, 'utf8');
        
        const migrationStatements = migrationSQL.split(';').filter(stmt => stmt.trim());
        
        for (const statement of migrationStatements) {
          if (statement.trim()) {
            await connection.query(statement + ';');
          }
        }
        console.log(`✅ Executed migration: ${file}`);
      }
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Database Information:');
    console.log(`   Host: ${DB_HOST}`);
    console.log(`   Port: ${DB_PORT}`);
    console.log(`   Database: ${DB_NAME}`);
    console.log(`   User: ${DB_USER}`);

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the setup
setupDatabase();