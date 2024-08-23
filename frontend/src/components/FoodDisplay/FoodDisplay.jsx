import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const FoodDisplay = ({ category }) => {
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
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
                      alt=""
                    ></img>
                  ) : (
                    <div className="food-items-counter">
                      <img
                        onClick={() => removeFromCart(item._id)}
                        src={assets.remove_icon_red}
                        alt=""
                      ></img>
                      <p>{cartItems[item._id]}</p>
                      <img
                        onClick={() => addToCart(item._id)}
                        src={assets.add_icon_green}
                        alt=""
                      ></img>
                    </div>
                  )}
                </div>
                <div className="food-items-info">
                  <div className="food-items-name-rating">
                    <p>{item.name}</p>
                    <img src={assets.rating_starts} alt=""></img>
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
    </div>
  );
};

export default FoodDisplay;
