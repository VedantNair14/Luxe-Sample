from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models, database, auth
from database import get_db, engine

app = FastAPI(title="Luxe Clothing API")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
models.Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Welcome to Luxe Clothing API"}

# Products
@app.get("/products", response_model=List[dict])
def get_products(category: Optional[str] = None, featured: Optional[bool] = None, db: Session = Depends(get_db)):
    query = db.query(models.Product)
    if category:
        query = query.join(models.Category).filter(models.Category.name == category)
    if featured is not None:
        query = query.filter(models.Product.is_featured == featured)
    products = query.all()
    return [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "image_url": p.image_url,
            "category": p.category.name if p.category else None,
            "is_featured": p.is_featured
        } for p in products
    ]

@app.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "image_url": product.image_url,
        "category": product.category.name if product.category else None,
        "images": [img.url for img in product.images],
        "stock": product.stock
    }

# Categories
@app.get("/categories")
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)
