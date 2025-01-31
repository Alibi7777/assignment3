password for db is 1234

admin gmail: alibialibi@gmail.com, password: 123456789 and you have access to /admin

account for **PayPal** \_TEST
email: sb-eibpy37225871@personal.example.com
password: mB@61uG4
(this acc is needed when you click to the proceed to checkout)

1.  Login Page & Admin Panel

    Implemented Secure Login System

    Users can log in with username and password stored securely in MongoDB Atlas.

    Passwords are hashed before saving to the database.

    JWT (JSON Web Token) is generated upon successful login to authenticate users.
    Username is displayed in place of the "Login" button after login.

    Login page redirects to the main page upon successful login.

    User Data Storage in MongoDB Atlas

2.  Admin Panel Functionality
    Admins can access /admin route (protected by JWT authentication).

    Created an admin dashboard (admin.ejs).

    Admins can:

    1. View all users in a table format (with name & role).
    2. Edit users (change username and role).
    3. Delete users permanently.
    4. Add new users (with email, username, password, and role).
    5. Assign admin role to other users.
    6. Implemented authentication middleware to ensure only admins can access /admin.

3.  Implemented /admin/history Route **_////////_**

    Created adminHistory.ejs page where admins can view API request logs.

    The history page displays user interactions with APIs, including:
    API name
    Requested endpoint
    User who made the request
    Timestamp
    API response

4.  PayPal API Integration
    We implemented a full PayPal payment system, including:

    User adds products to the cart.
    User clicks "Pay Now", triggering the /paypal/pay endpoint.
    The system creates a PayPal order and redirects the user to PayPal.
    User completes payment on PayPal.
    PayPal redirects the user back to /paypal/complete-order.
    The system captures the payment and stores transaction details.

5.  Mock API Integration for Products
    To simulate a real-world e-commerce experience, we integrated a Mock API to fetch product data dynamically.

    Fetching Products from Mock API
    Instead of using a database for products, we fetch them from MockAPI:

    API Endpoint:
    https://671f55f7e7a5792f052de069.mockapi.io/api/contact/products
    Stores product details such as:
    Product Name
    Price
    Image
    Description
    Products are dynamically loaded on the front-end.

6.  Clean Code & Structure AND Designed EJS templates
    Organized backend code into separate routes & controllers **_ / _**

        Designed EJS templates for:
                Login (login.ejs)
                Admin panel (admin.ejs)
                History page (adminHistory.ejs)
                Main index page (index.ejs)
