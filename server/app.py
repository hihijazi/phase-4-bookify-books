#!/usr/bin/env python3

from flask import Flask, jsonify, request, make_response, session
from flask_basicauth import BasicAuth
from flask_migrate import Migrate
from flask_restful import Api, Resource
from server.models import db, Book, Bookstore, Customer
from sqlalchemy.orm import joinedload
import os
import requests
from flask_cors import CORS
from dotenv import load_dotenv

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

def configure():
    load_dotenv()
dotenv_path = '/absolute/path/to/server/.env'
load_dotenv(dotenv_path)
api_key = os.getenv('API_KEY')

# Views go here!
@app.before_request        #allows any users to login 
def check_if_logged_in():
    allowed_endpoints = ['login', 'logout', 'users', 'orders']
    user_id = session.get('user_id')
    if not user_id and request.endpoint not in allowed_endpoints :
        return {'error': 'Unauthorized, Please Login'}, 401

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
                f"https://www.googleapis.com/books/v1/volumes?q=python&key={os.getenv('api_key')}"
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

api.add_resource(Books, '/books')

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

api.add_resource(BooksById, '/books/<int:id>')

class Bookstore(Resource):
    def get(self):
        bookstore_list = [
            bookstore.to_dict(rules=("'-customers",))
            for bookstore in Bookstore.query.all()
        ]
        return make_response(bookstore_list, 200)

api.add_resource(Bookstore, "/bookstores")

class BookstoreById(Resource):
    def get(self, id): 
        bookstore = Bookstore.query.filter_by(id=id).one_or_none()

        if bookstore is not None:
            return make_response(bookstore.to_dict(), 200)
        else:
            return make_response({"error": "Bookstore not found"}, 404)

    def delete(self, id):
        bookstore = Bookstore.query.filter_by(id=id).one_or_none()

        if bookstore is None:
            return make_response({"error": "Bookstore not found"}, 404)

        db.session.delete(res)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(BookstoreById, "/bookstores/<int:id>")

class Customers(Resource):
    def get(self):
        customers = [customer.to_dict() for customer in Customer.query.all()]
        return make_response(customers, 200)
    
    def post(self):
        try:
            data = request.get_json()
            user = Customer(
                name= data['name'],
                username= data['username']
            )
            user.password_hash = data['password'] ######################3
            db.session.add(user)
            db.session.commit()
            return make_response(user.to_dict(only=('id', 'name', 'username')), 201)
        except ValueError:
            return make_response({'error': 'Failed to add new user, try again!'}, 400)

api.add_resource(Customers, '/customers') 

class CustomersById(Resource):
    def get(self, id):
        user = Customer.query.filter(Customer.id == id).first()
        if user:
            return make_response(user.to_dict(only=('name', 'username')), 200)
        return make_response({'error': 'user not found'},404)
    def patch(self, id):
        user = Customer.query.filter(Customer.id == id).first()
        if user:
            try:
                data = request.get_json()
                if 'password' in data:
                    user.password_hash = data['password']
                    del data['password']
                for attr in data:
                    setattr(user, attr, data[attr])
                db.session.commit()
                return make_response(user.to_dict(only=('name', 'username')), 202)
            except ValueError:
                return make_response({'error': 'Failed to edit user'}, 400)

    def delete(self, id):
        user = Customer.query.filter(Customer.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({}, 204)
        return make_response({'error': 'User not found'}, 404)
    
api.add_resource(CustomersById, '/customers/<int:id>')

#authentification
class CheckSession(Resource):
    def get(self):
        customer = Customer.query.filter(Customer.id == session.get('user_id')).first()
        if customer:
            return customer.to_dict(only=('id','name', 'username'))
        else:
            return {'message': '401: Not Authorized'}, 401

class Login(Resource):
    def post(self):
        try:
            username = request.get_json()['username']
            password = request.get_json()['password']

            customer = Customer.query.filter(Customer.username == request.get_json()['username']).first()
            if customer:
                if customer.authenticate(password):
                    session['user_id'] = customer.id
                    return customer.to_dict(only=('id', 'name', 'username')), 200
            return {'error': 'Invalid username or password'}, 401
            
        except ValueError:
            return make_response({'error': 'Login failed'}, 400)     

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {'message': '204: No Content'}, 204 

api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == "__main__":
    app.run(port=5555, debug=True)