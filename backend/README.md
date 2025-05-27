# Relaxee Backend

This is the backend API for the Relaxee e-commerce application built with FastAPI.

## Features

- User authentication with JWT tokens
- Product management with categories and variants
- Shopping cart functionality
- Order processing
- Admin dashboard capabilities

## Tech Stack

- FastAPI - Modern, fast web framework for building APIs
- SQLAlchemy - SQL toolkit and ORM
- Pydantic - Data validation and settings management
- JWT Authentication - Secure user authentication
- SQLite - Development database (can be configured for PostgreSQL in production)

## Project Structure

```
backend/
├── app/
│   ├── routers/         # API route handlers
│   ├── models.py        # SQLAlchemy models
│   ├── schemas.py       # Pydantic schemas
│   ├── database.py      # Database configuration
│   ├── auth.py          # Authentication utilities
│   ├── init_db.py       # Database initialization
│   └── main.py          # FastAPI application
├── .env                 # Environment variables
├── requirements.txt     # Dependencies
└── run.py              # Entry point to run the application
```

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository

2. Navigate to the backend directory
   ```
   cd relaxee/backend
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Run the application
   ```
   python run.py
   ```

5. Access the API documentation at http://localhost:8000/docs

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/token` - Get access token

### Users
- GET `/api/users/me` - Get current user
- PUT `/api/users/me` - Update current user
- GET `/api/users` - Get all users (admin only)
- GET `/api/users/{user_id}` - Get user by ID (admin only)
- PUT `/api/users/{user_id}` - Update user (admin only)
- DELETE `/api/users/{user_id}` - Delete user (admin only)

### Products
- GET `/api/products` - Get all products
- GET `/api/products/{product_id}` - Get product by ID
- POST `/api/products` - Create product (admin only)
- PUT `/api/products/{product_id}` - Update product (admin only)
- DELETE `/api/products/{product_id}` - Delete product (admin only)

### Categories
- GET `/api/categories` - Get all categories
- GET `/api/categories/{category_id}` - Get category by ID
- POST `/api/categories` - Create category (admin only)
- PUT `/api/categories/{category_id}` - Update category (admin only)
- DELETE `/api/categories/{category_id}` - Delete category (admin only)

### Cart
- GET `/api/cart` - Get cart items
- POST `/api/cart` - Add item to cart
- PUT `/api/cart/{item_id}` - Update cart item
- DELETE `/api/cart/{item_id}` - Remove item from cart
- DELETE `/api/cart` - Clear cart

### Orders
- GET `/api/orders` - Get user orders
- GET `/api/orders/{order_id}` - Get order by ID
- POST `/api/orders` - Create order
- PUT `/api/orders/{order_id}` - Update order status (admin only)
- DELETE `/api/orders/{order_id}` - Delete order (admin only)
- GET `/api/orders/admin` - Get all orders (admin only)

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# Database configuration
DATABASE_URL=sqlite:///./relaxee.db

# Security
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## License

This project is licensed under the MIT License.