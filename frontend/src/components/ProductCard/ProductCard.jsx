import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import {
  FaShoppingCart,
  FaStar,
  FaRegStar,
  FaTag,
  FaTshirt,
  FaVenus,
  FaMars,
  FaGenderless
} from 'react-icons/fa';
import { GiUnderwearShorts } from 'react-icons/gi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  const stock = Number(product.stock_quantity) || 0;

  const discountedPrice = price - (price * discount) / 100;

  const inCart = isInCart(product.id, selectedSize, selectedColor);

  const handleAddToCart = () => {
    if (stock <= 0) return;

    setIsAdding(true);

    addToCart({
      ...product,
      price,
      selectedSize,
      selectedColor,
      quantity: 1
    });

    setTimeout(() => setIsAdding(false), 300);
  };

  const imageUrl =
    product.image_url ||
    'https://images.unsplash.com/photo-1580910051074-3eb694886505';

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />

      <div className="product-card__content">
        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="price">
          ₹{discountedPrice.toFixed(2)}
          {discount > 0 && (
            <span className="original-price">
              ₹{price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding || stock <= 0}
        >
          {stock <= 0 ? 'Out of Stock' : inCart ? 'In Cart' : 'Add to Cart'}
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
