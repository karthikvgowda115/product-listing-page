class Product {
  constructor(id, name, price, description, category, imageUrl, stock, createdAt) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.imageUrl = imageUrl;
    this.stock = stock;
    this.createdAt = createdAt;
  }

  static fromDBRow(row) {
    return new Product(
      row.id,
      row.name,
      parseFloat(row.price),
      row.description,
      row.category,
      row.image_url,
      row.stock,
      row.created_at
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category,
      imageUrl: this.imageUrl,
      stock: this.stock,
      createdAt: this.createdAt
    };
  }
}

module.exports = Product;