# Bookify Books a Bookstore Management App

## Owner: Hadil Hijazi

## Phase: Flask Phase 4 

## Description: This App allows you to streamline your bookstore operations.  Manage inventory, process orders, and provide a user-friendly interface for customers to browse, purchase, and review books. 

![Screenshot 2024-02-12 104333](https://github.com/hihijazi/phase-4-flask-project-bookstore/assets/148264944/2b9ca23c-b32b-4c4c-816f-0cb3bf66ecff)

## MVP 
##CRUD 

C. Add books, orders, and customers

R. Search books and orders

U. Update books and orders 

D. Delete books 



In this repo:

- There is a Flask application with some features built out.
- There is a fully built React frontend application.

You can check your API by:

- Using Postman to make requests

- Running the React application in the browser and interacting with the API via
  the frontend

You can import `project-4-bookstore.postman_collection.json` into Postman by
pressing the `Import` button.

## Setup

To download the dependencies for the frontend and backend, run:

```console
pipenv install
pipenv shell
npm install --prefix client
```

You can run your Flask API on [`127.0.0.1:5555`](http://127.0.0.1:5555/) by
running:

```console
python server/app.py
```

running:

```sh
npm start --prefix client
```

## Models

The file `server/models.py` defines the model classes **without relationships**.
Use the following commands to create the initial database `app.db`:

```console
export FLASK_APP=server/app.py
flask db init
flask db upgrade head
```
You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

You can run your React app on [`localhost:4000`](http://localhost:4000) by
running:

```sh
npm start --prefix client
```

## Many-to-many

- Customer has many orders through books
- Orders has many customerss through books
- Books belong to orders, and a customer

## Validations 

Add validations to the `Books` model:

- must have a name

Add validations to the `Orders` model:
- must have a name
- must have a price between 1 and 20

## Controllers

API routes RESTful conventions

```console
GET    /books/              
POST   /books/             
GET    /books/:id           
PATCH  /books/:id           
DELETE /books/:id
```          

```console
GET    /customer/             
POST   /customer/
```           

```console
GET    /orders/:id         
PATCH  /orders/:id         
DELETE /orders/:id
```      

## Serialize Rules
```console

FRONTEND (REACT) Which components will make requests to your API? What route will the competent send fetch requests too? (i.e: ArtistForm, send a POST requests to /artists)
-
-
-
```
```console
EXTRA!
Stretch goals:
- Suggested Books List according to previous book purchases.
-
-
```



