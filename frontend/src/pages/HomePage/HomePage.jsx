import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts } from '../../services/productService';
import { INNERWEAR_CATEGORIES } from '../../utils/constants';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setFeaturedProducts(products.slice(0, 4));
      setBestsellerProducts(products.slice(4, 8));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <h2>Featured Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {featuredProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <h2>Bestsellers</h2>
      <div className="products-grid">
        {bestsellerProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
