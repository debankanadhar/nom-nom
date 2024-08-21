import fs from "fs";
import Food from "../model/foodModel.js";

// Add food item
export const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file.filename;

  const newFood = new Food({
    name,
    description,
    price,
    category,
    image,
  });

  try {
    await newFood.save();
    res
      .status(201)
      .json({ success: true, message: "Food Added", data: newFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error("Error listing foods:", error);
    res.status(500).json({ success: false, message: "Error listing foods" });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  const { id } = req.body;

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Delete the associated image
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error("Error deleting image:", err);
    });

    await Food.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};
