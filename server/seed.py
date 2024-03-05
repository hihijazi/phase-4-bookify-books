#!/usr/bin/env python3
from models import Book, Bookstore, Customer
import requests
from app import app, db
from faker import Faker  # Import Faker

# Define the base URL for the Google Books API
BASE_URL = "https://www.googleapis.com/books/v1/volumes"

# Create an instance of Faker
faker = Faker()

def fetch_books_from_google_api():
    try:
        query = "python programming"  # Modify the query as needed
        params = {"q": query}

        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raise an exception for any HTTP errors

        data = response.json()
        return data.get("items", [])  # Extract the "items" list from the response
    except Exception as e:
        print(f"Error fetching books from Google API: {e}")
        return []

def seed_books_from_google_api():
    books = fetch_books_from_google_api()
    for item in books:
        volume_info = item.get("volumeInfo", {})
        title = volume_info.get("title", "")
        authors = volume_info.get("authors", [])
        author = ", ".join(authors) if authors else "Unknown"
        thumbnail = volume_info.get("imageLinks", {}).get("thumbnail", "")

        # Create a Book object and add it to the session
        book = Book(title=title, author=author, thumbnail=thumbnail)
        db.session.add(book)

    # Commit the session to the database
    db.session.commit()
    print("Books seeded successfully.")

with app.app_context():
    # This will delete any existing rows
    # so you can run the seed file multiple times without having duplicate entries in your database
    print("Deleting data...")
    Book.query.delete()  
    Bookstore.query.delete()
    Customer.query.delete()

    # Generate fake data for customers
    print("Generating fake customers...")
    customers = [Customer(name=faker.name()) for _ in range(10)]  # Generate 10 fake customers

    # Add generated objects to the session
    db.session.add_all(customers)

    # Commit the session to the database
    db.session.commit()

    seed_books_from_google_api()

    # Generate fake data for bookstores
    print("Generating fake bookstores...")
    bookstores = []
    for _ in range(10):  # Generate 10 bookstores
        bookstore = Bookstore(
            name=faker.company(),
            address=faker.address(),
            customer_id=faker.random_element(elements=range(1, 11)),
            book_id=faker.random_element(elements=range(1, 11)),
            quantity=faker.random_int(min=1, max=5)
    )
    bookstores.append(bookstore)

    # Commit the session to the database
    db.session.commit()

    print("Seeding done!")
