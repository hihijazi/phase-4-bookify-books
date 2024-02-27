#!/usr/bin/env python3

import requests
from faker import Faker
from models import Book, Order, Customer
from app import app, db

# Define the base URL for the Flask backend API
BASE_URL = "http://127.0.0.1:5555"

faker = Faker()

with app.app_context():
    # This will delete any existing rows
    # so you can run the seed file multiple times without having duplicate entries in your database
    print("Deleting data...")
    Book.query.delete()
    Order.query.delete()
    Customer.query.delete()

    # Generate fake data for customers
    print("Generating fake customers...")
    customers = [Customer(name=faker.name()) for _ in range(10)]  # Generate 10 fake customers

    # Function to fetch book data from Google Books API
    def fetch_books_from_google(api_key):
        try:
            # Make a request to the Google Books API to fetch book data
            response = requests.get(
                f"https://www.googleapis.com/books/v1/volumes?q=python&key={api_key}"
            )
            if response.ok:
                data = response.json()
                # Extract relevant information from the response and return it
                books = []
                for item in data.get("items", []):
                    # Extract title and author
                    title = item["volumeInfo"]["title"]
                    author = ", ".join(item["volumeInfo"]["authors"]) if "authors" in item["volumeInfo"] else None
                    # Extract price or set default if not available or not in the expected range
                    price = None
                    if "saleInfo" in item and "listPrice" in item["saleInfo"]:
                        price = item["saleInfo"]["listPrice"]["amount"] / 100
                        if not (price and 1 <= price <= 15):
                            price = None  # Set default price
                    # Create Book object
                    book = Book(title=title, author=author, price=price)
                    books.append(book)
                return books
            else:
                print(f"Failed to fetch book data from the Google Books API: {response.status_code} - {response.text}")
                return []
        except Exception as e:
            print(f"Error fetching book data: {e}")
            return []

    api_key = 'AIzaSyC05Boe1MwpOND_lf0Uu_uoN1zvpGlVlT8'

    books = fetch_books_from_google(api_key)

    # Add fetched books to the database
    if books:
        print("Adding fetched books to the database...")
        for book in books:
            db.session.add(book)
        db.session.commit()
        print("Fetched books added successfully!")
    else:
        print("No books fetched from the Google Books API.")

    # Generate fake data for orders with total price capped at $150
    print("Generating fake orders...")
    orders = [
        Order(total_price=faker.random_int(min=100, max=15000) / 100,  # Divide by 100 to get dollars and cents
              customer_id=faker.random_element(elements=range(1, 11)))
        for _ in range(10)
    ]

    # Add generated objects to the session
    db.session.add_all(customers)
    db.session.add_all(orders)
    
    # Commit the session to the database
    db.session.commit()

    print("Seeding done!")
