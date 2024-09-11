import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [allFoodItems, setAllFoodItems] = useState([]);
  const url = "https://food-delivery-website-backend-b6qm.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [totalPages, setTotalPages] = useState(1); // Add state for total pages
  const [limit] = useState(12); // Limit of items per page
  const navigate = useNavigate();

  //list all foods
  const listAllFoods = async () => {
    const response = await axios.get(url + "/api/food/allfoods");
    setAllFoodItems(response.data.data);
  };
  // Add to Cart Functionality
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove from Cart Functionality
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch Food List with Pagination
  const fetchFoodList = async (page = 1) => {
    try {
      const response = await axios.get(
        `${url}/api/food/list?page=${page}&limit=${limit}`
      );
      setFoodList(response.data.data); // Set the food list from response
      setTotalPages(response.data.totalPages); // Set total pages from response
      setCurrentPage(response.data.currentPage); // Set current page from response
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load Cart Data based on token
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
    } catch (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === "Token expired") {
          navigate("/");
        }
      }
    }
  };

  // Handle Page Change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchFoodList(newPage);
    }
  };

  // Initial Data Load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList(currentPage);
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const ContextValue = {
    url,
    allFoodItems,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    currentPage,
    totalPages,
    handlePageChange, // Add handlePageChange to context
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
