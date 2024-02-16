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
    books = [
    Book(
        title=faker.sentence(),
        author=faker.name(),
        price=faker.random_int(min=1, max=15)  # Generate a random integer between 1 and 15
    ) for _ in range(10)
            ]  # Generate 10 fake books

    # Generate fake data for orders with total price capped at $150
    print("Generating fake orders...")
    orders = [
    Order(total_price=faker.random_int(min=100, max=15000) / 100,  # Divide by 100 to get dollars and cents
          customer_id=faker.random_element(elements=range(1, 11)))
    for _ in range(10)
            ]


    # Add generated objects to the session
    db.session.add_all(customers)
    db.session.add_all(books)
    db.session.add_all(orders)
    
    # Commit the session to the database
    db.session.commit()

    print("Seeding done!")