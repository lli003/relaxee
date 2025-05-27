from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from datetime import datetime

from ..database import get_db
from ..models import Order, OrderItem, CartItem, Product, ProductVariant, User
from ..schemas import OrderCreate, OrderResponse, OrderUpdate
from ..auth import get_current_active_user, get_current_admin_user

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.get("", response_model=List[OrderResponse])
async def get_orders(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """Get all orders for the current user."""
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .options(joinedload(Order.items))
        .order_by(Order.created_at.desc())
        .all()
    )
    return orders


@router.get("/admin", response_model=List[OrderResponse])
async def get_all_orders(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin_user),
):
    """Get all orders (admin only)."""
    orders = (
        db.query(Order)
        .options(joinedload(Order.items))
        .order_by(Order.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    """Get a specific order."""
    order = db.query(Order).filter(Order.id == order_id).options(joinedload(Order.items)).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Check if the order belongs to the current user or if the user is an admin
    if order.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized to access this order")

    return order


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: OrderCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)
):
    """Create a new order from cart items."""
    # Get cart items
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    # Calculate total amount
    total_amount = 0
    order_items = []

    for cart_item in cart_items:
        product = db.query(Product).filter(Product.id == cart_item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with id {cart_item.product_id} not found")

        # Get price (from variant if applicable, otherwise from product)
        price = product.price
        variant = None
        if cart_item.variant_id:
            variant = (
                db.query(ProductVariant)
                .filter(ProductVariant.id == cart_item.variant_id)
                .first()
            )
            if not variant:
                raise HTTPException(
                    status_code=404, detail=f"Variant with id {cart_item.variant_id} not found"
                )
            # Check if variant has enough stock
            if variant.stock < cart_item.quantity:
                raise HTTPException(
                    status_code=400,
                    detail=f"Not enough stock for variant {variant.id} of product {product.name}",
                )
            # Update variant stock
            variant.stock -= cart_item.quantity
        else:
            # Check if product has enough stock
            if product.stock < cart_item.quantity:
                raise HTTPException(
                    status_code=400, detail=f"Not enough stock for product {product.name}"
                )
            # Update product stock
            product.stock -= cart_item.quantity

        # Calculate item total
        item_total = price * cart_item.quantity
        total_amount += item_total

        # Create order item
        order_items.append(
            OrderItem(
                product_id=cart_item.product_id,
                variant_id=cart_item.variant_id,
                quantity=cart_item.quantity,
                price=price,
            )
        )

    # Create order
    db_order = Order(
        user_id=current_user.id,
        total_amount=total_amount,
        status="pending",
        shipping_address=order.shipping_address,
        items=order_items,
    )

    # Add order to database
    db.add(db_order)

    # Clear cart
    for cart_item in cart_items:
        db.delete(cart_item)

    db.commit()
    db.refresh(db_order)
    return db_order


@router.put("/{order_id}", response_model=OrderResponse)
async def update_order(
    order_id: int,
    order: OrderUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin_user),
):
    """Update an order (admin only)."""
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Update order status if provided
    if order.status:
        db_order.status = order.status
        db_order.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(db_order)
    return db_order


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(
    order_id: int, db: Session = Depends(get_db), _: dict = Depends(get_current_admin_user)
):
    """Delete an order (admin only)."""
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Delete order items first
    db.query(OrderItem).filter(OrderItem.order_id == order_id).delete()

    # Delete order
    db.delete(db_order)
    db.commit()
    return None