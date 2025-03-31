import React, { useContext, useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ExploreMenu = ({ category, setCategory }) => {
  const { handleCategoryChange } = useContext(StoreContext);
  const menuRef = useRef(null);
  let touchStartX = 0;

  // Scroll buttons
  const scrollLeft = () => menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
  const scrollRight = () => menuRef.current.scrollBy({ left: 200, behavior: "smooth" });

  // Mobile swipe support
  const handleTouchStart = (e) => (touchStartX = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) scrollRight(); // Swipe left
    else if (touchStartX - touchEndX < -50) scrollLeft(); // Swipe right
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover a world of culinary delights crafted to satisfy every craving.
      </p>

      <div className="menu-controls">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div
          className="explore-menu-list"
          ref={menuRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {menu_list.map((item, index) => (
            <div
              key={index}
              className={`explore-menu-list-item ${category === item.menu_name ? "selected" : ""}`}
              onClick={() => {
                const newCategory = category === item.menu_name ? "All" : item.menu_name;
                setCategory(newCategory);
                handleCategoryChange(newCategory);
              }}
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={category === item.menu_name ? "active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
