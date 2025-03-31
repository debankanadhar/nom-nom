import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa"; // Modern icons
import { MdOutlineShoppingCart } from "react-icons/md";
import { assets } from "../../assets/assets";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const {
    food_list,
    filteredFoods,
    cartItems,
    addToCart,
    removeFromCart,
    currentPage,
    totalPages,
    handlePageChange,
    pagination,
  } = useContext(StoreContext);

  return (
    <div className="food-display">
      <h1> Popular Dishes Near You</h1>

      <div className="food-display-list">
        {filteredFoods.map((item) => (
          <div key={item._id} id="food-items">
            <div className="food-items-image-container">
              <img className="food-items-image" src={item.image} alt={item.name} />
              {!cartItems[item._id] ? (
                <FaPlusCircle
                  className="add-to-cart-icon"
                  onClick={() => addToCart(item._id)}
                  size={30}
                  color="white"
                />
              ) : (
                <div className="food-items-counter">
                  <FaMinusCircle size={22} color="red" onClick={() => removeFromCart(item._id)} />
                  <p>{cartItems[item._id]}</p>
                  <FaPlusCircle size={22} color="green" onClick={() => addToCart(item._id)} />
                </div>
              )}
            </div>
            <div className="food-items-info">
              <div className="food-items-name-rating">
                <p>{item.name}</p>
                <img src={assets.rating_starts} alt="Rating" />
              </div>
              <p className="food-items-description">{item.description}</p>
              <p className="food-items-price">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {pagination && (
        <div className="pagination-controls">
          <button className="prev-page" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>

          {currentPage > 1 && (
            <button className="page-number" onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </button>
          )}

          <button className="current-page" disabled>{currentPage}</button>

          {[...Array(3)].map((_, index) => {
            const page = currentPage + index + 1;
            return page <= totalPages ? (
              <button key={page} className="page-number" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ) : null;
          })}

          <button className="next-page" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
