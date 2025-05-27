from sqlalchemy.orm import Session
from .models import Base, User, Product, Category, ProductVariant
from .database import engine, SessionLocal
from .auth import get_password_hash


def init_db():
    # Create tables
    Base.metadata.create_all(bind=engine)

    # Create a session
    db = SessionLocal()

    try:
        # Check if we already have users
        if db.query(User).count() == 0:
            create_initial_users(db)

        # Check if we already have categories
        if db.query(Category).count() == 0:
            create_initial_categories(db)
            db.commit()  # Commit after adding categories so they are available for product creation

        # Check if we already have products
        if db.query(Product).count() == 0:
            create_initial_products(db)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"Error initializing database: {e}")
    finally:
        db.close()


def create_initial_users(db: Session):
    # Create admin user
    admin_user = User(
        email="admin@relaxee.com",
        hashed_password=get_password_hash("admin123"),
        is_active=True,
        is_admin=True,
    )
    db.add(admin_user)

    # Create regular user
    regular_user = User(
        email="user@relaxee.com",
        hashed_password=get_password_hash("user123"),
        is_active=True,
    )
    db.add(regular_user)


def create_initial_categories(db: Session):
    categories = [
        Category(
            name="Clothing",
            description="Comfortable and stylish clothing for all occasions",
            image_url="/images/categories/clothing.jpg",
        ),
        Category(
            name="Electronics",
            description="Latest gadgets and electronic devices",
            image_url="/images/categories/electronics.jpg",
        ),
        Category(
            name="Home & Kitchen",
            description="Everything you need for your home",
            image_url="/images/categories/home.jpg",
        ),
        Category(
            name="Beauty & Personal Care",
            description="Products to help you look and feel your best",
            image_url="/images/categories/beauty.jpg",
        ),
    ]

    for category in categories:
        db.add(category)


def create_initial_products(db: Session):
    # Get categories
    clothing = db.query(Category).filter(Category.name == "Clothing").first()
    electronics = db.query(Category).filter(Category.name == "Electronics").first()
    home = db.query(Category).filter(Category.name == "Home & Kitchen").first()
    beauty = db.query(Category).filter(Category.name == "Beauty & Personal Care").first()

    # Create products
    products = [
        {
            "name": "Relaxed Fit T-Shirt",
            "description": "Comfortable cotton t-shirt with a relaxed fit, perfect for everyday wear.",
            "price": 19.99,
            "image_url": "/images/products/tshirt.jpg",
            "stock": 100,
            "is_featured": True,
            "categories": [clothing],
            "variants": [
                {"name": "Size", "value": "Small", "stock": 30},
                {"name": "Size", "value": "Medium", "stock": 40},
                {"name": "Size", "value": "Large", "stock": 30},
                {"name": "Color", "value": "Black", "stock": 50},
                {"name": "Color", "value": "White", "stock": 50},
            ],
        },
        {
            "name": "Wireless Headphones",
            "description": "High-quality wireless headphones with noise cancellation for an immersive audio experience.",
            "price": 99.99,
            "image_url": "/images/products/headphones.jpg",
            "stock": 50,
            "is_featured": True,
            "categories": [electronics],
            "variants": [
                {"name": "Color", "value": "Black", "stock": 25},
                {"name": "Color", "value": "White", "stock": 25},
            ],
        },
        {
            "name": "Aromatherapy Diffuser",
            "description": "Essential oil diffuser with LED lights and multiple mist settings for a relaxing atmosphere.",
            "price": 39.99,
            "image_url": "/images/products/diffuser.jpg",
            "stock": 75,
            "is_featured": True,
            "categories": [home, beauty],
            "variants": [
                {"name": "Size", "value": "Small", "stock": 25},
                {"name": "Size", "value": "Large", "stock": 50},
                {"name": "Scent", "value": "Lavender", "stock": 30},
                {"name": "Scent", "value": "Vanilla", "stock": 30},
                {"name": "Scent", "value": "Sandalwood", "stock": 20},
            ],
        },
    ]

    for product_data in products:
        variants_data = product_data.pop("variants")
        categories = product_data.pop("categories")

        product = Product(**product_data)
        product.categories = categories

        db.add(product)
        db.flush()  # Flush to get the product ID

        for variant_data in variants_data:
            variant = ProductVariant(**variant_data, product_id=product.id)
            db.add(variant)

    # No commit here; commit is handled by the caller
