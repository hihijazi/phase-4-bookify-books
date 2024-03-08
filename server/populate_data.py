import click
from faker import Faker
import bcrypt
from models import Bookstore, Customer, db

fake = Faker()


def populate_db(num_bookstores=5, num_customers_per_bookstore=10):
    """Populate the database with fake bookstores and customers."""
    for _ in range(num_bookstores):  # Add specified number of bookstores
        bookstore = Bookstore(
            name=fake.company(),
            address=fake.address()
        )
        db.session.add(bookstore)
        db.session.flush()  # Flush to assign an ID to bookstore without committing the transaction

        for _ in range(num_customers_per_bookstore):  # Add specified number of customers per bookstore
            customer = Customer(
                name=fake.name(),
                username=fake.user_name(),
                bookstore_id=bookstore.id  # Associate customer with the current bookstore
            )
            # Set password using the password setter to hash it properly
            customer.password_hash = 'Password123'  # Use a dummy password that meets your validation criteria

            db.session.add(customer)

    db.session.commit()
    print(f"Database populated with {num_bookstores} bookstores and {num_customers_per_bookstore} customers each.")
