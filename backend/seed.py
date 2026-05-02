from database import SessionLocal, engine
import models

def seed():
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if categories exist
    if db.query(models.Category).first():
        print("Database already seeded")
        return

    # Add categories
    mens = models.Category(name="Men")
    womens = models.Category(name="Women")
    accessories = models.Category(name="Accessories")
    db.add_all([mens, womens, accessories])
    db.commit()

    # Add products
    products = [
        models.Product(
            name="Classic Black Overcoat",
            description="A premium wool-blend overcoat for a timeless look.",
            price=299.99,
            stock=10,
            category_id=mens.id,
            image_url="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000",
            is_featured=True
        ),
        models.Product(
            name="Silk Evening Dress",
            description="Elegant silk dress perfect for evening galas.",
            price=450.00,
            stock=5,
            category_id=womens.id,
            image_url="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
            is_featured=True
        ),
        models.Product(
            name="Leather Chelsea Boots",
            description="Handcrafted Italian leather boots with a modern silhouette.",
            price=180.00,
            stock=20,
            category_id=mens.id,
            image_url="https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000",
            is_featured=True
        ),
        models.Product(
            name="Minimalist Gold Watch",
            description="Sophisticated watch with a minimalist dial and premium finish.",
            price=120.00,
            stock=15,
            category_id=accessories.id,
            image_url="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000",
            is_featured=True
        )
    ]
    db.add_all(products)
    db.commit()
    print("Database seeded successfully")

if __name__ == "__main__":
    seed()
