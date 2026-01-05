import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaTshirt, FaHeart } from 'react-icons/fa';
import { GiUnderwearShorts } from 'react-icons/gi';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <p className="header-promo">
            🚚 <strong>Free Shipping</strong> on orders above ₹1500
          </p>
          <div className="header-actions">
            <Link to="/contact">Contact Us</Link>
            <Link to="/track-order">Track Order</Link>
            <Link to="/size-guide">Size Guide</Link>
          </div>
        </div>
      </div>

      <nav className="header-main">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo">
            <GiUnderwearShorts className="logo-icon" />
            <div className="logo-text">
              <h1>Innerwear Shop</h1>
              <p className="logo-tagline">Premium Comfort Wear</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search innerwear..." 
              className="search-input"
            />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

          {/* User Actions */}
          <div className="user-actions">
            <Link to="/wishlist" className="action-btn">
              <FaHeart />
              <span className="action-label">Wishlist</span>
            </Link>
            
            <Link to="/account" className="action-btn">
              <FaUser />
              <span className="action-label">Account</span>
            </Link>
            
            <Link to="/cart" className="action-btn cart-btn">
              <FaShoppingCart />
              <span className="cart-count">{cartCount}</span>
              <span className="action-label">Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Categories Navigation */}
      <nav className="categories-nav">
        <div className="container">
          <ul className="categories-list">
            <li><Link to="/category/all">All Innerwear</Link></li>
            <li><Link to="/category/boxers">Boxers</Link></li>
            <li><Link to="/category/briefs">Briefs</Link></li>
            <li><Link to="/category/vests">Vests</Link></li>
            <li><Link to="/category/thermal-wear">Thermal Wear</Link></li>
            <li><Link to="/category/sets">Innerwear Sets</Link></li>
            <li><Link to="/category/sports">Sports Innerwear</Link></li>
            <li><Link to="/offers" className="sale-link">Sale 🎉</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;