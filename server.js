const express = require("express");
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require('./db'); // Adjust the path if needed


const app = express();
const PORT = 3000;
const apiKey = "1da12cdfab6dfbdb58e30233c938cf87"; // OpenWeather API key
// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


connectDB();


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});


// Serve Weather Page
app.get("/weather", (req, res) => {
  res.render("weather", { weatherData: null, mapData: null, error: null });
});

// Fetch Weather Data
app.post("/weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.render("weather", {
      weatherData: null,
      mapData: null,
      error: "Please provide valid latitude and longitude.",
    });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);``
    const weatherData = response.data;

    const mapData = {
      lat: latitude,
      lon: longitude,
      city: weatherData.name,
    };

    res.render("weather", { weatherData, mapData, error: null });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.render("weather", {
      weatherData: null,
      mapData: null,
      error: "Unable to fetch weather data. Please try again.",
    });
  }
});

// Fetch Products Data
app.get("/products", async (req, res) => {
  try {
    const url =
      "https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products";
    const response = await axios.get(url);
    const products = response.data;

    // Send the product data as JSON
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ error: "Unable to fetch products. Please try again later." });
  }
});

app.get("/contact", async (req, res) => {
  try {
    const response = await axios.get("https://favqs.com/api/qotd");
    const quote = response.data;

    res.render("contact", { quote });
  } catch (error) {
    console.error("Error fetching quote:", error.message);
    res.render("contact", { quote: null });
  } 
});
app.get("/login", async (req,res) =>{ 
  res.sendFile(path.join(__dirname, "public/html/login.html"))
})


// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
