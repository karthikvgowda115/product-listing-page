import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductListing.css';

const ProductListing = () => {
  const { categoryId } = useParams();
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading products...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;
  }

  // Filter products by category from URL
  const filteredProducts =
    categoryId && categoryId !== 'all'
      ? products.filter(
          (product) =>
            product.category?.toLowerCase() === categoryId.toLowerCase()
        )
      : products;

  return (
    <div className="product-listing">
      <div className="container">
        <h1 className="page-title">
          {categoryId === 'all' || !categoryId
            ? 'All Innerwear'
            : `${categoryId.toUpperCase()} Collection`}
        </h1>

        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: 'center' }}>
            No products found in this category.
          </p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
