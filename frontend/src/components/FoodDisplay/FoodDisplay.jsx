import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    currentPage,
    totalPages,
    handlePageChange,
  } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      {/* Food List */}
      <div className="food-display-list">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <div key={item._id} id="food-items">
                <div className="food-items-image-container">
                  <img
                    className="food-items-image"
                    src={item.image}
                    alt={item.name || "Food item"}
                  />
                  {!cartItems || !cartItems[item._id] ? (
                    <img
                      className="add"
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_white}
                      alt="Add to Cart"
                    ></img>
                  ) : (
                    <div className="food-items-counter">
                      <img
                        onClick={() => removeFromCart(item._id)}
                        src={assets.remove_icon_red}
                        alt="Remove from Cart"
                      ></img>
                      <p>{cartItems[item._id]}</p>
                      <img
                        onClick={() => addToCart(item._id)}
                        src={assets.add_icon_green}
                        alt="Add More to Cart"
                      ></img>
                    </div>
                  )}
                </div>
                <div className="food-items-info">
                  <div className="food-items-name-rating">
                    <p>{item.name}</p>
                    <img src={assets.rating_starts} alt="Rating"></img>
                  </div>
                  <p className="food-items-description">{item.description}</p>
                  <p className="food-items-price">₹{item.price}</p>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="prev-page"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} // Disable if on the first page
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="next-page"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FoodDisplay;
