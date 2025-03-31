import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, allFoodItems, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();
  
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p className="cart-item-count">{Object.keys(cartItems).filter(id => cartItems[id] > 0).length} items</p>
      </div>
      
      <div className="cart-items-container">
        {allFoodItems.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">₹{item.price}</p>
                  <div className="cart-item-quantity">
                    <span>Qty: {cartItems[item._id]}</span>
                  </div>
                </div>
                <div className="cart-item-total">
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="cart-item-remove"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M6 6L18 18" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
      
      <div className="cart-summary">
        <div className="promo-section">
          <input 
            type="text" 
            placeholder="Enter promo code" 
            className="promo-input"
          />
          <button className="promo-button">Apply</button>
        </div>
        
        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>
          <div className="total-row">
            <span>Delivery</span>
            <span>₹{getTotalCartAmount() === 0 ? 0 : 80}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total</span>
            <span>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 80}</span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate("/order")}
          className="checkout-button"
          disabled={getTotalCartAmount() === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;