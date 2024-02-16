#!/usr/bin/env python3
from models import Book, Order, Customer
import requests
from app import app, db
from faker import Faker  # Import Faker

# Define the base URL for the Flask backend API
BASE_URL = "http://127.0.0.1:5555"

# Create an instance of Faker
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

    # Generate fake data for books
    print("Generating fake books...")
    books = [Book(title=faker.sentence(), author=faker.name(), price=faker.random_number()) for _ in range(10)]  # Generate 10 fake books

    # Generate fake data for orders
    print("Generating fake orders...")
    orders = [Order(total_price=faker.random_number(), customer_id=faker.random_element(elements=range(1, 11))) for _ in range(10)]  # Generate 10 fake orders with random customer IDs

    # Add generated objects to the session
    db.session.add_all(customers)
    db.session.add_all(books)
    db.session.add_all(orders)
    
    # Commit the session to the database
    db.session.commit()

    print("Seeding done!")