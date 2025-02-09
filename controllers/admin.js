const History = require("../models/History");
const User = require("../models/User");
const axios = require("axios");

exports.adminPage = async (req, res) => {
  try {
    const users = await User.find();
    res.render("admin", { users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Failed to load admin panel");
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find()

      .populate("user", "firstname _id") // Only fetch firstname and _id
      .sort({ timestamp: -1 }); // Sort history in descending order

    res.render("adminHistory", { history }); // Render EJS page with history data
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({ error: "Failed to load history" });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get a Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create a New User
exports.createUser = async (req, res) => {
  try {
    const { firstname, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ firstname, email, password, role });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { firstname, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, email, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.adminItemsPage = async (req, res) => {
  try {
    const response = await axios.get(
      "https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products"
    );
    const items = response.data;
    res.render("adminItems", { items });
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).send("Failed to load admin items panel");
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Get Single Item
exports.getItem = async (req, res) => {
  try {
    const { lang } = req.query;
    const response = await axios.get(
      `https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products/${req.params.id}`
    );

    // Transform the response based on language
    const transformedData = {
      ...response.data,
      name: lang === "kz" ? response.data.nameKaz : response.data.nameEnglish,
      description:
        lang === "kz"
          ? response.data.descriptionKaz
          : response.data.descriptionEnglish,
    };

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

// Get All Items
exports.getAllItems = async (req, res) => {
  try {
    const { lang } = req.query;
    const response = await axios.get(
      "https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products"
    );

    // Transform the response based on language
    const transformedData = response.data.map((item) => ({
      ...item,
      name: lang === "kz" ? item.nameKaz : item.nameEnglish,
      description:
        lang === "kz" ? item.descriptionKaz : item.descriptionEnglish,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching items:", error.message);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

// Create Item
exports.createItem = async (req, res) => {
  try {
    const response = await axios.post(
      "https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products",
      req.body
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.error("Error creating item:", error.message);
    res.status(500).json({ error: "Failed to create item" });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const response = await axios.put(
      `https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ error: "Failed to update item" });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    await axios.delete(
      `https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products/${req.params.id}`
    );
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
