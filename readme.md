**Project Overview**
Dynamic Weather Information: Displays the current weather for a specified location with details like temperature, humidity, and wind speed.
Inspirational Quotes: Displays a new random quote each time the "Contact Us" page is accessed.
Product Listings: Fetches and displays product details dynamically using a mock API.

**Setup Instructions**
Install dependencies:

npm install

**API Usage Details**

1. **Weather API**

Provider: OpenWeather
Endpoint: /weather
Description: Fetches the current weather for a specified latitude and longitude.
Request Parameters:
latitude: Latitude of the location (e.g., 37.7749 for San Francisco).
longitude: Longitude of the location (e.g., -122.4194 for San Francisco).
Response Fields:
main.temp: Current temperature in Celsius.
main.humidity: Current humidity percentage.
wind.speed: Wind speed in meters per second.
weather[0].description: A short description of the weather (e.g., "clear sky").

2. **Quote API**

Provider: Quotable API
Endpoint: /contact
Description: Fetches a random inspirational quote to display on the Contact Us page.
Response Fields:
content: The text of the quote.
author: The author of the quote.

3. **Products API**

Provider: Mock API
Endpoint: /products
Description: Fetches product details for dynamic product listing.
Response Fields:
id: Unique identifier for the product.
name: Name of the product.
price: Price of the product.
image: Image URL for the product.

**DESIGN**

Built with Express.js: We chose Express.js for the backend to keep things simple, efficient, and flexible for handling routing and API integration.
Dynamic API Handling: All APIs (Weather, Quotes, and Products) are managed in the backend to keep the frontend clean and focused on presentation.
Clear Separation of Responsibilities: By handling data fetching and processing in the backend, we ensure the frontend only needs to display the data, improving performance and maintainability.
