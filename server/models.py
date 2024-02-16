from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from faker import Faker


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


db = SQLAlchemy(metadata=metadata)

Faker = Faker() 

class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    
    # Add relationship
    orders = db.relationship('Order', back_populates='customer', cascade = 'all, delete')

    # Add serialization rules
    serialize_rules=('-orders.customer',)

    @validates('id', 'name')
    def validate_customer(self, key, value):
        if key == 'name':
            if not value or (not isinstance(value, str)):
                raise ValueError('Name must be a chracter!')
            return value
        if key == 'id':
            if not 50 <= value <= 100:
                raise ValueError('Id must be between 50 and 100!')
            return value
    
    def __repr__(self):
        return f'<Customer {self.id}: {self.name} >'

# Models begin here! 

class Book(db.Model, SerializerMixin):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String)
    price = db.Column(db.Float)
    author = db.Column(db.String)   

    orders = db.relationship('Order', back_populates= 'book')

    serialize_rules = ('-orders.book',)

    @validates('title')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Must have a name.')
        return name



    @validates('price')
    def validate_price(self, key, price):
        if price >= 0:
            return price
        else:
            raise ValueError('Price must be a valid integer')
        
    def __repr__(self):
        return f'<Class {self.id}:  {self.name}: {self.price}'



class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float)

    # Add relationship
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

    book = db.relationship('Book', back_populates='orders')
    customer = db.relationship('Customer', back_populates='orders')

    # Add serialization rules
    serialize_rules=('-book.orders', '-customer.orders',)

    # Add validation 
    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Must add name!')
        return value
    
    @validates('price')
    def validate_price(self, key, value):
        if not 1 <= value <= 20:
            raise ValueError('Price must be between 1 and 20!')
        return value
    
    def __repr__(self):
        return f'<Class {self.id}: {self.name}>'