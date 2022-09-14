# API Requirements 
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Tables design and datatypes

- `EXTENSION IF NOT EXISTS "uuid-ossp"`

**Users**

    - `TABLE users(
        id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password text NOT NULL
    )`

**Products**

    - `TABLE products(
        id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price integer NOT NULL
    )`

**Ordres**

    - `TYPE order_status AS ENUM ('active', 'complete')`
    - `TABLE orders(
        id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        user_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
        status order_status NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
    )`

**Order_Products**

    - `TABLE orders(
        id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        user_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
        status order_status NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
    )`

## API Endpoints
- http://localhost:4000/api

**Users**
    **/users**
        - Method [POST]
        - Route: `/register`
        - Description: Create a new user
        - Body: name, email, password
    - **/users**
        - Method [POST]
        - Route: `/login`
        - Description: Logged in (auth) and generate token
        - Body: email, password
    - **/users**
        - Method [GET]
        - Route: `/`
        - Description: Return all users.
        - x-auth-header: `Bearer token.....`
    - **/users**
        - Method [GET]
        - Route: `/:id`
        - Description: Return a user using by using id.
        - x-auth-header: `Bearer token.....`
     - **/users**
        - Method [DELETE]
        - Route: `/:id`
        - Description: Delete the user by id.
        - x-auth-header: `Bearer token.....`

**Products**

    /products
        - Method [POST]
        - Route: `/`
        - Description: Create a new product
        - Body: name, price
        - x-auth-header: `Bearer token.....`
    
        - Method [GET]
        - Route: `/`
        - Description: Get all products
    
        - Method [GET]
        - Route: `/:id`
        - Description: Get product

**orders**

    - **/orders**
        - Method [POST]
        - Route: `/`
        - Description: Create a new order
        - Body: user_id, status
        - x-auth-header: `Bearer token.....`
    - **/orders**
        - Method [GET]
        - Route: `/:userId`
        - Description: Get all Current Orders by user
        - x-auth-header: `Bearer token.....`
    - **/orders**
        - Method [POST]
        - Route: `/:id/products`
        - Description: Add product in oreder
        - Body: quantity, productId
        - x-auth-header: `Bearer token.....`