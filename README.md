# Amazon Clone

Amazon Clone is a full-stack web application that replicates key features of the Amazon shopping platform. This project demonstrates a fully functional e-commerce platform with product management, user authentication, and order processing using modern web technologies.

## Features

- User registration, login, and profile management
- Product listing, creation, update, and deletion
- Shopping cart and order management
- Secure authentication and authorization
- Responsive and dynamic UI

## Technologies Used

- **Frontend**: React, Redux Toolkit, Vite, CSS,Tailwind
- **Backend**: Node.js, Express.js, MongoDB
- **Deployment**: Azure VM,Docker and github actions

## Environment Variables

The frontend connects to backend APIs defined by the following environment variables:

```plaintext
VITE_BASE_URL = http://localhost:3000

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
Endpoint: GET /api/v1/product/:id <br />
Description: Fetches details of a single product by its ID. <br />
Parameters: <br />
 &ensp; id (string): Product ID.<br />

**Create Product**<br />
Endpoint: POST /api/v1/products/new<br />
Description: Creates a new product.<br />
Request Body:<br />
 &ensp; name (string): Name of the product.<br />
 &ensp; price (number): Price of the product.<br />
 &ensp; description (string): Description of the product.<br />
 &ensp; category (string): Category of the product.<br />
 &ensp; stock (number): Stock quantity.<br />

**Update Product**<br />
Endpoint: PUT /api/v1/product/:id<br />
Description: Updates an existing product by its ID.<br />
Parameters:<br />

 &ensp; id (string): Product ID.<br />
 &ensp; Request Body:<br />
 &ensp; Fields to update (e.g., name, price, etc.).<br />
  
**Delete Product**<br />
Endpoint: DELETE /api/v1/product/:id<br />
Description: Deletes a product by its ID.<br />
Parameters:<br />

 &ensp; id (string): Product ID.<br />
 
**User APIs**<br />

**Register User**<br />
Endpoint: POST /api/v1/register<br />
Description: Registers a new user.<br />
 &ensp; Request Body:<br />
  
 &ensp; name (string): User’s name.<br />
 &ensp; email (string): User’s email.<br />
 &ensp; password (string): User’s password.<br />
 
**Login User**<br />
Endpoint: POST /api/v1/login<br />
Description: Logs in a user.<br />
Request Body:<br />
  
 &ensp; email (string): User’s email.<br />
 &ensp; password (string): User’s password.<br />
 
**Forgot Password**<br />
Endpoint: POST /api/v1/password/forgot<br />
Description: Initiates password reset for a user.<br />
Request Body:<br />

 &ensp; email (string): User’s email.<br />
 
**Change Password**<br />
Endpoint: PUT /api/v1/password/change/:token<br />
Description: Changes the user’s password using a reset token.<br />
Parameters:<br />

  &ensp;token (string): Password reset token.<br />
  &ensp;Request Body:<br />
  &ensp;password (string): New password.<br />
  
**Update Profile**<br />
Endpoint: PUT /api/v1/update/:id<br />
Description: Updates user profile information.<br />
Parameters:<br />

 &ensp; id (string): User ID.<br />
 &ensp; Request Body:<br />
 &ensp; Fields to update (e.g., name, email).<br />
 
**Check User Profile**<br />
Endpoint: GET /api/v1/myprofile<br />
Description: Retrieves the logged-in user’s profile.<br />

**Logout**<br />
Endpoint: GET /api/v1/logout<br />
Description: Logs out the current user.<br />

**Order APIs**<br />
Create New Order<br />
Endpoint: POST /api/v1/order/new<br />
Description: Creates a new order.<br />
Request Body:<br />

 &ensp; items (array): List of items in the order.<br />
 &ensp; shippingInfo (object): Shipping details.<br />
 
**Get My Orders**<br />
Endpoint: GET /api/v1/myorders<br />
Description: Fetches orders for the logged-in user.<br />

**Get Single Order**<br />
Endpoint: GET /api/v1/order/:id<br />
Description: Fetches details of a specific order by ID.<br />
Parameters:<br />

id (string): Order ID.<br />

**How to Run the Application** <br />
1.**Download**<br />
  git clone https://github.com/harish-x/amazon-clone<br />
  cd amazon-clone<br />

2.**Install dependencies:** <br />
  bash<br />
  Copy code<br />
  npm install<br />
  Create a .env file with the required environment variables as shown above.<br />

3.**Start the development server:** <br />
  bash<br />
  Copy code<br />
  npm run dev<br />
  
4.**Build the application for production:** <br />
  bash<br />
  Copy code
  npm run build
  
5.**Preview the production build:**

  bash
  Copy code
  npm run preview

if you want deployment code go to release branch it contains **Docker files**,**Docker-compose file** and **github actions file**
just create vm and github actions runners and configure

Contributing
Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
