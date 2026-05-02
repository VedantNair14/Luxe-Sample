import sqlite3

def update_db():
    conn = sqlite3.connect('luxe_clothing.db')
    cursor = conn.cursor()
    
    updates = [
        ("/images/overcoat.png", 1),
        ("/images/dress.png", 2),
        ("/images/boots.png", 3),
        ("/images/watch.png", 4)
    ]
    
    for url, pid in updates:
        cursor.execute('UPDATE products SET image_url = ? WHERE id = ?', (url, pid))
        
    conn.commit()
    conn.close()
    print("Database updated successfully.")

if __name__ == "__main__":
    update_db()
