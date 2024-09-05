# Amazon Clone

Amazon Clone is a full-stack web application that replicates key features of the Amazon shopping platform. This project demonstrates a fully functional e-commerce platform with product management, user authentication, and order processing using modern web technologies.

## Features

- User registration, login, and profile management
- Product listing, creation, update, and deletion
- Shopping cart and order management
- Secure authentication and authorization
- Responsive and dynamic UI

## Technologies Used

- **Frontend**: React, Redux Toolkit, Vite, CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: Azure VM

## Environment Variables

The frontend connects to backend APIs defined by the following environment variables:

```plaintext
VITE_BASE_URL = http:localhost:300

VITE_GET_ALL_PRODUCTS = api/v1/products
VITE_GET_SINGLE_PRODUCT = api/v1/product/
VITE_CREATE_PRODUCT = api/v1/products/new
VITE_UPDATE_PRODUCT = api/v1/product/
VITE_DELETE_PRODUCT = api/v1/product/

VITE_REGISTER_USER = api/v1/register
VITE_LOGIN_USER = api/v1/login
VITE_FORGOT_PASSWORD = api/v1/password/forgot
VITE_CHANGE_PASSWORD = api/v1/password/change/
VITE_UPDATE_PROFILE = api/v1/update/
VITE_CHECKUSER = api/v1/myprofile
VITE_LOGOUT = api/v1/logout

VITE_NEW_ORDER = api/v1/order/new
VITE_MY_ORDER = api/v1/myorders
VITE_SINGLE_ORDER = api/v1/order/
```
**Product APIs**
Get All Products
Endpoint: GET /api/v1/products
Description: Fetches all products available in the store.

**Get Single Product**
Endpoint: GET /api/v1/product/:id
Description: Fetches details of a single product by its ID.
Parameters:

id (string): Product ID.
**Create Product**
Endpoint: POST /api/v1/products/new
Description: Creates a new product.
Request Body:

name (string): Name of the product.
price (number): Price of the product.
description (string): Description of the product.
category (string): Category of the product.
stock (number): Stock quantity.
Update Product
Endpoint: PUT /api/v1/product/:id
Description: Updates an existing product by its ID.
Parameters:

id (string): Product ID.
Request Body:
Fields to update (e.g., name, price, etc.).
Delete Product
Endpoint: DELETE /api/v1/product/:id
Description: Deletes a product by its ID.
Parameters:

id (string): Product ID.
**User APIs**
**Register User**
Endpoint: POST /api/v1/register
Description: Registers a new user.
Request Body:

name (string): User’s name.
email (string): User’s email.
password (string): User’s password.
**Login User**
Endpoint: POST /api/v1/login
Description: Logs in a user.
Request Body:

email (string): User’s email.
password (string): User’s password.
**Forgot Password**
Endpoint: POST /api/v1/password/forgot
Description: Initiates password reset for a user.
Request Body:

email (string): User’s email.
**Change Password**
Endpoint: PUT /api/v1/password/change/:token
Description: Changes the user’s password using a reset token.
Parameters:

token (string): Password reset token.
Request Body:
password (string): New password.
**Update Profile**
Endpoint: PUT /api/v1/update/:id
Description: Updates user profile information.
Parameters:

id (string): User ID.
Request Body:
Fields to update (e.g., name, email).
**Check User Profile**
Endpoint: GET /api/v1/myprofile
Description: Retrieves the logged-in user’s profile.

**Logout**
Endpoint: GET /api/v1/logout
Description: Logs out the current user.

**Order APIs**
Create New Order
Endpoint: POST /api/v1/order/new
Description: Creates a new order.
Request Body:

items (array): List of items in the order.
shippingInfo (object): Shipping details.
**Get My Orders**
Endpoint: GET /api/v1/myorders
Description: Fetches orders for the logged-in user.

**Get Single Order**
Endpoint: GET /api/v1/order/:id
Description: Fetches details of a specific order by ID.
Parameters:

id (string): Order ID.

**How to Run the Application**
1.
  git clone https://github.com/harish-x/amazon-clone
  cd amazon-clone

2.Install dependencies:
  bash
  Copy code
  npm install
  Create a .env file with the required environment variables as shown above.

3.Start the development server:

  bash
  Copy code
  npm run dev
  
3.Build the application for production:

  bash
  Copy code
  npm run build
4.Preview the production build:

  bash
  Copy code
  npm run preview

if you want deployment code go to release branch it contains **Docker files**,**Docker-compose file** and **github actions file**
just create vm and github actions runners and configure

Contributing
Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
