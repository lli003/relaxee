from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload

from ..database import get_db
from ..models import Product, Category, ProductVariant
from ..schemas import ProductCreate, ProductResponse, ProductUpdate, ProductVariantCreate, ProductVariantResponse
from ..auth import get_current_admin_user, get_current_active_user

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=List[ProductResponse])
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category_id: Optional[int] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Get all products with optional filtering."""
    query = db.query(Product).options(
        joinedload(Product.categories),
        joinedload(Product.variants)
    )

    # Apply filters
    if category_id:
        query = query.join(Product.categories).filter(Category.id == category_id)

    if featured is not None:
        query = query.filter(Product.is_featured == featured)

    if search:
        search_term = f"%{search}%"
        query = query.filter(Product.name.ilike(search_term) | Product.description.ilike(search_term))

    # Apply pagination
    products = query.offset(skip).limit(limit).all()
    return products


@router.get("/featured", response_model=List[ProductResponse])
async def get_featured_products(db: Session = Depends(get_db)):
    """Get featured products."""
    products = (
        db.query(Product)
        .filter(Product.is_featured == True)
        .options(joinedload(Product.categories), joinedload(Product.variants))
        .all()
    )
    return products


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a specific product by ID."""
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .options(joinedload(Product.categories), joinedload(Product.variants))
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product: ProductCreate, db: Session = Depends(get_db), _: dict = Depends(get_current_admin_user)
):
    """Create a new product (admin only)."""
    # Create product
    db_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        image_url=product.image_url,
        stock=product.stock,
        is_featured=product.is_featured,
    )

    # Add categories
    if product.category_ids:
        categories = db.query(Category).filter(Category.id.in_(product.category_ids)).all()
        if len(categories) != len(product.category_ids):
            raise HTTPException(status_code=400, detail="One or more categories not found")
        db_product.categories = categories

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    # Add variants if provided
    if product.variants:
        for variant in product.variants:
            db_variant = ProductVariant(
                product_id=db_product.id,
                name=variant.name,
                value=variant.value,
                price_adjustment=variant.price_adjustment,
                stock=variant.stock,
            )
            db.add(db_variant)

        db.commit()
        db.refresh(db_product)

    return db_product


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin_user),
):
    """Update a product (admin only)."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Update product fields
    update_data = product.dict(exclude_unset=True)
    
    # Handle category_ids separately
    if "category_ids" in update_data:
        category_ids = update_data.pop("category_ids")
        if category_ids:
            categories = db.query(Category).filter(Category.id.in_(category_ids)).all()
            if len(categories) != len(category_ids):
                raise HTTPException(status_code=400, detail="One or more categories not found")
            db_product.categories = categories

    # Update remaining fields
    for key, value in update_data.items():
        setattr(db_product, key, value)

    db.commit()
    db.refresh(db_product)
    return db_product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_admin_user)
):
    """Delete a product (admin only)."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return None


# Product Variants
@router.post("/{product_id}/variants", response_model=ProductVariantResponse)
async def add_product_variant(
    product_id: int,
    variant: ProductVariantCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin_user),
):
    """Add a variant to a product (admin only)."""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_variant = ProductVariant(
        product_id=product_id,
        name=variant.name,
        value=variant.value,
        price_adjustment=variant.price_adjustment,
        stock=variant.stock,
    )

    db.add(db_variant)
    db.commit()
    db.refresh(db_variant)
    return db_variant