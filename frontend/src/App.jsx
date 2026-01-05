import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import ProductListing from './pages/ProductListing/ProductListing';
import CartPage from './pages/CartPage/CartPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Header />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<ProductListing />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<div>Wishlist Page</div>} />
              <Route path="/account" element={<div>Account Page</div>} />
              <Route path="/offers" element={<div>Offers Page</div>} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>

          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>Innerwear Shop</h3>
                  <p>Premium innerwear for everyday comfort. Quality products at affordable prices.</p>
                </div>
                <div className="footer-section">
                  <h4>Categories</h4>
                  <ul>
                    <li><a href="/category/boxers">Boxers</a></li>
                    <li><a href="/category/briefs">Briefs</a></li>
                    <li><a href="/category/vests">Vests</a></li>
                    <li><a href="/category/thermal-wear">Thermal Wear</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Support</h4>
                  <ul>
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/size-guide">Size Guide</a></li>
                    <li><a href="/returns">Returns & Exchanges</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Contact</h4>
                  <p>📞 +91 98765 43210</p>
                  <p>✉️ support@innerwearshop.com</p>
                  <p>📍 Mysore, India</p>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Innerwear Shop. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;