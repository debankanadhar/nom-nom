import User from "../model/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let cartData = (await userData.cartData) || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// remove items from user cart

const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Removed the item from cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error removing the item from the cart",
    });
  }
};

//fetch user Cart data

const getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: "Error getting cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
