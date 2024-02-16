from models import db, Order, Book, Customer
from flask_migrate import Migrate
from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import os


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

@app.route('/api/data')
def get_combined_data():
    books = [book.to_dict() for book in Book.query.all()]
    orders = [order.to_dict() for order in Order.query.all()]
    return jsonify({'books': books, 'orders': orders})

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

CORS(app)

@app.route('/')
def index():
    return 'Welcome to the Bookstore API!'

class Books(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return make_response(books, 200)
    
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

from flask import Flask, request, make_response
from flask_restful import Api, Resource
from models import Order, db

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

api.add_resource(Books, '/books')
api.add_resource(BooksById, '/books/<int:id>')
api.add_resource(Customers, '/customers')
api.add_resource(Orders, '/orders')
api.add_resource(OrdersById, '/orders/<int:id>')

if __name__ == "__main__":
    app.run(port=5555, debug=True)