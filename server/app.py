#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Book, Order, Customer
import os
import requests
from flask_cors import CORS



BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

cors = CORS(app)

migrate = Migrate(app, db)

api = Api(app)

db.init_app(app)

api_key = 'AIzaSyC05Boe1MwpOND_lf0Uu_uoN1zvpGlVlT8'

@app.route('/')
def index():
    return 'Welcome to Bookify Books Bookstore API!'

class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)
    def get(self):
        try:
            # Use the Google Books API to fetch book data
            response = requests.get(
                f"https://www.googleapis.com/books/v1/volumes?q=python&key={api_key}"
            )
            if response.ok:
                data = response.json()
                # Extract relevant information from the response and return it
                books = [
                    {
                        "title": item["volumeInfo"]["title"],
                        "author": ", ".join(item["volumeInfo"]["authors"]),
                        "description": item["volumeInfo"]["description"] if "description" in item["volumeInfo"] else "",
                        "image": item["volumeInfo"]["imageLinks"]["thumbnail"] if "imageLinks" in item["volumeInfo"] else "",
                    }
                    for item in data.get("items", [])
                ]
                return make_response(jsonify(books), 200)
            else:
                return make_response({"error": "Failed to fetch book data from the Google Books API"}, 500)
        except Exception as e:
            return make_response({"error": str(e)}, 500)
    
    def post(self):
        data = request.get_json()
        try:
            new_book = Book(
                name = data['name'],
                price = data['price']
            )
            db.session.add(new_book)
            db.session.commit()
            return make_response(new_book.to_dict(rules = ('-orders',)), 201)
        except ValueError:
            return make_response({
                'error':'Validation Error'
            })
        
class BooksById(Resource):
    def get(self, id):
        book = Book.query.filter(Book.id == id).first()
        if book:
            return make_response(book.to_dict(), 200)
        else:
            return make_response({
                'error' : 'No Book found'
            }, 404)
        
    def patch(self, id):
        book = Book.query.filter(Book.id == id).first()
        if book:
            try:
                data = request.get_json()
                for attr in data:
                    setattr(book, attr, data[attr])
                    db.session.commit()
                    return make_response(book.to_dict(), 202)
            except ValueError:
                return make_response({
                    'error': 'Validation error'
                }, 404)
            
    def delete(self, id):
        book = Book.query.filter(Book.id == id).first()
        if book:
            db.session.delete(book)
            db.session.commit()
            return make_response({}, 204)
        return make_response({
            'error': 'No Book found'
        }, 404)
    
class Customers(Resource):
    def get(self):
        customers = [customer.to_dict() for customer in Customer.query.all()]
        return make_response(customers, 200)
    
    def post(self):
        data = request.get_json()
        try:
            new_customer = Customer(
                name=data['name']
            )
            db.session.add(new_customer)
            db.session.commit()
            return make_response(new_customer.to_dict(rules=('-orders',)), 201)
        except ValueError:
            return make_response({
                'error': 'Validation Error'
            })

class Orders(Resource):
    def get(self):
        try:
            # Fetch orders from the database
            orders = [order.to_dict() for order in Order.query.all()]
            # Return a JSON response with the orders data and status code 200 (OK)
            return make_response({"orders": orders}, 200)
        except Exception as e:
            # If an error occurs, return an error response with status code 500 (Internal Server Error)
            return make_response({"error": str(e)}, 500)
    
    def post(self):
        # Extract data from the request body
        data = request.get_json()
        try:
            # Create a new order object
            new_order = Order(
                total_price=data['total_price'],
                customer=data['customer']
            )
            # Add the new order to the database session
            db.session.add(new_order)
            # Commit the session to save the changes to the database
            db.session.commit()
            # Return a JSON response with the newly created order and status code 201 (Created)
            return make_response({"order": new_order.to_dict()}, 201)
        except Exception as e:
            # If an error occurs, return an error response with status code 400 (Bad Request)
            return make_response({'error': str(e)}, 400)

        
class OrdersById(Resource):
    def get(self, id):
        order = Order.query.filter(Order.id == id).first()
        if order:
            return make_response(order.to_dict(), 200)
        else:
            return make_response({
                'error': 'No Order found'
            }, 404)
        
    def patch(self, id):
        order = Order.query.filter(Order.id == id).first()
        try:
            data = request.get_json()
            for attr in data:
                setattr(order, attr, data[attr])
                db.session.commit()
                return make_response(order.to_dict(), 202)
        except ValueError:
            return make_response({
                'error': 'Validation error'
            },404)
    
    def delete(self, id):
        order = Order.query.filter(Order.id == id).first()
        if order:
            db.session.delete(order)
            db.session.commit()
            return make_response({}, 204)
        return make_response({
            'error': 'No book found'
        }, 404)
    
class Login(Resource):
    users = {
        'admin123': 'password123',
        'hadil_hijazi': 'password456'
    }

    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if username in self.users and self.users[username] == password:
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401

api.add_resource(Books, '/books')
api.add_resource(BooksById, '/books/<int:id>')
api.add_resource(Customers, '/customers')
api.add_resource(Orders, '/orders')
api.add_resource(OrdersById, '/orders/<int:id>')
api.add_resource(Login, '/login')

if __name__ == "__main__":
    app.run(port=5555, debug=True)