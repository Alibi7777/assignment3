const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const PRODUCT_REVIEW_API = "https://fakestoreapi.com/products";

exports.register = async (req, res) => {
  const { firstname, email, password } = req.body;

  if (!firstname || !email || !password) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Пользователь с таким email уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ token: token, username: user.firstname });
  } catch (error) {
    console.error("Ошибка входа:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Fetch Products
exports.getProducts = async (req, res) => {
  try {
    const { lang } = req.query;
    const url =
      "https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products";
    const response = await axios.get(url);

    // Transform the response based on language
    const transformedData = response.data.map((product) => ({
      ...product,
      name: lang === "kz" ? product.nameKaz : product.nameEnglish,
      description:
        lang === "kz" ? product.descriptionKaz : product.descriptionEnglish,
    }));

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ error: "Unable to fetch products. Please try again later." });
  }
};

// Fetch Product Reviews
exports.getReviews = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const url = `${PRODUCT_REVIEW_API}/${productId}`;
    const response = await axios.get(url);
    const productData = response.data;

    res.json({
      title: productData.title,
      price: productData.price,
      description: productData.description,
      rating: productData.rating ? productData.rating.rate : "No rating",
      reviewCount: productData.rating
        ? productData.rating.count
        : "No reviews available",
    });
  } catch (error) {
    console.error(
      `Review API Error for product ${req.query.productId}:`,
      error.message
    );
    res.status(500).json({ error: "Error fetching reviews" });
  }
};
