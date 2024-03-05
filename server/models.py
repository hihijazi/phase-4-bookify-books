from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, metadata, bcrypt
import re

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata) 

# Models

# Many-to-many relationship table
# book_customer = db.Table('book_customer',
#     db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True),
#     db.Column('customer_id', db.Integer, db.ForeignKey('customers.id'), primary_key=True)
# )

class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    # Add relationship
    books = db.relationship('Book', secondary=book_customer, back_populates='customers')
    bookstores = db.relationship('Bookstore', secondary=bookstore_customer, back_populates='customers')

    # Add serialization rules
    serialize_rules=('-books.customer',)

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
#removed decode, encoding
    @password_hash.setter
    def password_hash(self, password):
        self.validate_user('password_hash', password)  # Validate the password

        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<Customer {self.id}: {self.name} >'


class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    price = db.Column(db.Float)
    author = db.Column(db.String) 
    thumbnail = db.Column(db.String(256))  

    # add relationship
    customers = db.relationship('Customer', secondary=book_customer, back_populates='books')

    # add serialization rules
    serialize_rules = ('-customers.book',)

    # add validation
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
        return f'<Book {self.id}:  {self.title}: {self.price}'



class Bookstore(db.Model, SerializerMixin):
    __tablename__ = 'bookstores'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
  
    # Add relationship 
    customers = db.relationship("Customer", secondary=bookstore_customer, back_populates='bookstores')

    # Add serialization rules
    serialize_rules = ('-customers.bookstores',)

    # Add validations

    def __repr__(self):
        return f'<Bookstore {self.id}: {self.name}: {self.address}>'

    
