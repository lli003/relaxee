from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional, Union
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserLogin(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    password: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    is_admin: Optional[bool] = None


# Category schemas
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    name: Optional[str] = None


class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True


# Product variant schemas
class ProductVariantBase(BaseModel):
    name: str
    value: str
    price_adjustment: float = 0.0
    stock: int = 0


class ProductVariantCreate(ProductVariantBase):
    pass


class ProductVariantUpdate(ProductVariantBase):
    name: Optional[str] = None
    value: Optional[str] = None
    price_adjustment: Optional[float] = None
    stock: Optional[int] = None


class ProductVariantResponse(ProductVariantBase):
    id: int
    product_id: int

    class Config:
        from_attributes = True


# Product schemas
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    image_url: str
    stock: int = 0
    is_featured: bool = False


class ProductCreate(ProductBase):
    category_ids: List[int] = []
    variants: Optional[List[ProductVariantCreate]] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    is_featured: Optional[bool] = None
    category_ids: Optional[List[int]] = None


class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    categories: List[CategoryResponse] = []
    variants: List[ProductVariantResponse] = []

    class Config:
        from_attributes = True


# Cart item schemas
class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1
    variant_id: Optional[int] = None


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: Optional[int] = None
    variant_id: Optional[int] = None


class CartItemResponse(CartItemBase):
    id: int
    user_id: int
    product: ProductResponse

    class Config:
        from_attributes = True


# Order item schemas
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float
    variant_id: Optional[int] = None


class OrderItemCreate(OrderItemBase):
    pass


class OrderItemResponse(OrderItemBase):
    id: int
    order_id: int
    product: ProductResponse

    class Config:
        from_attributes = True


# Order schemas
class OrderBase(BaseModel):
    shipping_address: str
    payment_method: str


class OrderCreate(OrderBase):
    items: List[OrderItemCreate]


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    shipping_address: Optional[str] = None


class OrderResponse(OrderBase):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True