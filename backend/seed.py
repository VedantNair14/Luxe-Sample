from database import SessionLocal, engine
import models

def seed():
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Clear existing data to re-seed with high quality
    db.query(models.ProductImage).delete()
    db.query(models.Product).delete()
    db.query(models.Category).delete()
    db.commit()

    # Add categories
    mens = models.Category(name="Men")
    womens = models.Category(name="Women")
    accessories = models.Category(name="Accessories")
    shoes = models.Category(name="Shoes")
    db.add_all([mens, womens, accessories, shoes])
    db.commit()

    # Refresh objects to get IDs
    db.refresh(mens)
    db.refresh(womens)
    db.refresh(accessories)
    db.refresh(shoes)

    # Add products
    products_data = [
        {
            "name": "Obsidian Cashmere Overcoat",
            "description": "Architectural silhouette crafted from pure Mongolian cashmere. Featuring a structured shoulder and silk-satin lining for the ultimate expression of minimalist luxury.",
            "price": 2450.00,
            "stock": 5,
            "category_id": mens.id,
            "image_url": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=3000",
            "is_featured": True,
            "tag": "Limited Edition"
        },
        {
            "name": "Ethereal Silk Gala Gown",
            "description": "Flowing 100% mulberry silk gown with a hand-draped bodice and floor-sweeping train. A masterpiece of movement and light, designed for unforgettable entrances.",
            "price": 3800.00,
            "stock": 3,
            "category_id": womens.id,
            "image_url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=3000",
            "is_featured": True,
            "tag": "Couture"
        },
        {
            "name": "Heritage Calfskin Chelsea",
            "description": "Hand-burnished Italian calfskin boots with a seamless construction. Sculpted last and custom stacked leather heel for unparalleled comfort and timeless style.",
            "price": 890.00,
            "stock": 12,
            "category_id": shoes.id,
            "image_url": "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=3000",
            "is_featured": True,
            "tag": "Craftsman"
        },
        {
            "name": "Horizon Chronograph",
            "description": "Precision-engineered timepiece featuring a brushed titanium case and deep sapphire crystal. Minimalist dial with hand-applied indices and an exhibition caseback.",
            "price": 5200.00,
            "stock": 2,
            "category_id": accessories.id,
            "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=3000",
            "is_featured": True,
            "tag": "Precision"
        },
        {
            "name": "Ivory Merino Turtleneck",
            "description": "Ultra-fine 18-gauge merino wool knit. A versatile foundation piece with a tailored fit and exceptionally soft hand-feel. The essence of quiet luxury.",
            "price": 420.00,
            "stock": 20,
            "category_id": mens.id,
            "image_url": "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=3000",
            "is_featured": False
        },
        {
            "name": "Midnight Velvet Blazer",
            "description": "Deep navy velvet blazer with silk peak lapels. A modern take on classic evening wear, featuring a slim, contemporary silhouette and exquisite tailoring.",
            "price": 1200.00,
            "stock": 8,
            "category_id": mens.id,
            "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=3000",
            "is_featured": True,
            "tag": "New Season"
        }
    ]

    for p_data in products_data:
        product = models.Product(**p_data)
        db.add(product)
        db.commit()
        db.refresh(product)
        
        # Add secondary images
        secondary_images = [
            models.ProductImage(url=p_data["image_url"], product_id=product.id),
            models.ProductImage(url=p_data["image_url"].replace("q=80", "q=60"), product_id=product.id)
        ]
        db.add_all(secondary_images)
        db.commit()

    print("Database seeded with Top 0.01% Luxury Data successfully")

if __name__ == "__main__":
    seed()
