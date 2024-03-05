from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Column, Integer, String, Float
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
import re

# Models

class Bookstore(db.Model, SerializerMixin):
    __tablename__ = 'bookstores'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
  
    # Add relationship with Customer
    customers = db.relationship("Customer", back_populates='bookstore', cascade='all, delete')

    # Add serialization rules
    serialize_rules = ('-customers.bookstore',)

    # Add validations

    def __repr__(self):
        return f'<Bookstore {self.id}: {self.name}: {self.address}>'


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    price = db.Column(db.Float)
    author = db.Column(db.String) 
    thumbnail = db.Column(db.String(256))  

    # Add relationship with Customer
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    customer = db.relationship('Customer', back_populates='books')

    # Add serialization rules
    serialize_rules = ('-customer.books',)

    # Add validation
    @validates('title')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name.')
        return name

    @validates('price')
    def validate_price(self, key, value):
        if not 1 <= value <= 100:
            raise ValueError('Price must be between 1 and 100')
        
    def __repr__(self):
        return f'<Book {self.id}:  {self.title}: {self.price}>'



class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    

    # Add relationship
    bookstore_id = db.Column(db.Integer, db.ForeignKey('bookstores.id'))

    # Add foreign key to Book
    bookstore = db.relationship('Bookstore', back_populates='customers')
    books = db.relationship('Book', back_populates='customer')

    # Add serialization rules
    serialize_rules = ('-books.customer', '-bookstore.customers')

    # Add validation
    @validates('name', 'username', 'password_hash')
    def validate_user(self, key, value):
        if value is None or (not value.strip()):
            raise ValueError('Name, username, and password must exist!')
        if key == 'password_hash':
            if (len(value) < 5 or len(value) > 11) or (not re.search("[a-z]", value)) or (not any(char.isdigit() for char in value)):
                raise ValueError("Invalid password. Must be 6 to 12 characters, contain lowercase and numbers")

        return value

    @hybrid_property
    def password_hash(self):    
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        self.validate_user('password_hash', password)  # Validate the password

        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<Customer {self.id}: {self.name} >'


