from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from ..database import get_db
from ..models import CartItem, Product, ProductVariant, User
from ..schemas import CartItemCreate, CartItemResponse, CartItemUpdate
from ..auth import get_current_active_user

router = APIRouter(prefix="/api/cart", tags=["cart"])


@router.get("", response_model=List[CartItemResponse])
async def get_cart_items(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """Get all items in the user's cart."""
    cart_items = (
        db.query(CartItem)
        .filter(CartItem.user_id == current_user.id)
        .options(joinedload(CartItem.product).joinedload(Product.categories))
        .all()
    )
    return cart_items


@router.post("", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
async def add_to_cart(
    item: CartItemCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)
):
    """Add an item to the cart."""
    # Check if product exists
    product = db.query(Product).filter(Product.id == item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Check if variant exists if provided
    if item.variant_id:
        variant = (
            db.query(ProductVariant)
            .filter(ProductVariant.id == item.variant_id, ProductVariant.product_id == item.product_id)
            .first()
        )
        if not variant:
            raise HTTPException(status_code=404, detail="Product variant not found")

        # Check if variant has enough stock
        if variant.stock < item.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock for this variant")
    else:
        # Check if product has enough stock
        if product.stock < item.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock for this product")

    # Check if item already exists in cart
    existing_item = (
        db.query(CartItem)
        .filter(
            CartItem.user_id == current_user.id,
            CartItem.product_id == item.product_id,
            CartItem.variant_id == item.variant_id,
        )
        .first()
    )

    if existing_item:
        # Update quantity instead of creating new item
        existing_item.quantity += item.quantity
        db.commit()
        db.refresh(existing_item)
        return existing_item

    # Create new cart item
    db_item = CartItem(
        user_id=current_user.id,
        product_id=item.product_id,
        quantity=item.quantity,
        variant_id=item.variant_id,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@router.put("/{item_id}", response_model=CartItemResponse)
async def update_cart_item(
    item_id: int,
    item: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    """Update a cart item."""
    db_item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id, CartItem.user_id == current_user.id)
        .first()
    )
    if not db_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    # Update quantity if provided
    if item.quantity is not None:
        # Check if product has enough stock
        if item.variant_id:
            variant = (
                db.query(ProductVariant)
                .filter(ProductVariant.id == item.variant_id, ProductVariant.product_id == db_item.product_id)
                .first()
            )
            if not variant:
                raise HTTPException(status_code=404, detail="Product variant not found")
            if variant.stock < item.quantity:
                raise HTTPException(status_code=400, detail="Not enough stock for this variant")
        else:
            product = db.query(Product).filter(Product.id == db_item.product_id).first()
            if product.stock < item.quantity:
                raise HTTPException(status_code=400, detail="Not enough stock for this product")

        db_item.quantity = item.quantity

    # Update variant if provided
    if item.variant_id is not None:
        # Check if variant exists and belongs to the product
        if item.variant_id > 0:  # Only check if not removing variant
            variant = (
                db.query(ProductVariant)
                .filter(ProductVariant.id == item.variant_id, ProductVariant.product_id == db_item.product_id)
                .first()
            )
            if not variant:
                raise HTTPException(status_code=404, detail="Product variant not found")

        db_item.variant_id = item.variant_id if item.variant_id > 0 else None

    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_from_cart(
    item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)
):
    """Remove an item from the cart."""
    db_item = (
        db.query(CartItem)
        .filter(CartItem.id == item_id, CartItem.user_id == current_user.id)
        .first()
    )
    if not db_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    db.delete(db_item)
    db.commit()
    return None


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
async def clear_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """Clear all items from the cart."""
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return None