import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { ShoppingCart, Search, User, LogOut, Package, Home, Phone, Bot } from "lucide-react";
import "./navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isShrunk, setIsShrunk] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsShrunk(true);
    } else {
      setIsShrunk(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsProfileOpen(false);
  };

  return (
    <div className={`navbar ${isShrunk ? "shrink" : ""}`}>
      <Link to="/">
        <img
          className="logo"
          src={assets.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          alt="logo"
        />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setMenu("Home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={menu === "Home" ? "active" : ""}
        >
          <Home size={18} className="menu-icon" />
          <span>Home</span>
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          <Package size={18} className="menu-icon" />
          <span>Menu</span>
        </a>
        <Link
  to="/ai"
  onClick={() => setMenu("Mobile-app")}
  className={menu === "Mobile-app" ? "active" : ""}
>
  <Bot size={18} className="menu-icon" />
  <span>AI Assistant</span>
</Link>
        <a
          href="#footer"
          onClick={() => setMenu("Contact us")}
          className={menu === "Contact us" ? "active" : ""}
        >
          <Phone size={18} className="menu-icon" />
          <span>Contact</span>
        </a>
      </ul>
      <div className="navbar-right">
      <button className="search-btn" aria-label="Search">
      <Bot size={20} className="menu-icon1" />
      </button>
      
       
        
        <div className="navbar-basket_icon">
          <Link to="/cart" aria-label="Cart">
            <ShoppingCart size={24} />
            {getTotalCartAmount() > 0 && (
              <span className="dot"></span>
            )}
          </Link>
        </div>
        
        {!token ? (
          <button 
            onClick={() => setShowLogin(true)} 
            className="signin-btn"
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="profile-btn"
              aria-label="Profile"
            >
              <User size={24} />
            </button>
            
            {isProfileOpen && (
              <ul className="navbar-profile-dropdown">
                <li onClick={() => {
                  navigate("/myorders");
                  setIsProfileOpen(false);
                }}>
                  <Package size={18} />
                  <span>Orders</span>
                </li>
                <hr />
                <li onClick={logout}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;