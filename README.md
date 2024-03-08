# Bookify Books a Bookstore Management App

## Owner: Hadil Hijazi

## Phase: Flask Phase 4 

## Description: This App allows users to view available books.  Also porovides a list of nearby bookstores with their addresses.  Users can signup for an account and login and logout.  Users can delete a bookstore that no longer is within group.   

![diagram_new](https://github.com/hihijazi/phase-4-bookify-books/assets/148264944/f04d68f6-da0f-4076-9687-33782e53035e)

## MVP 
##CRUD 

C. Add books, bookstores

R. Search books and bookstores

U. Update books and bookstores 

D. Delete bookstores 

Auth. Signup/Login/Logout 



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
cd client - npm install
```

You can run your Flask API on [`127.0.0.1:5555`](http://127.0.0.1:5555/) by
running:

```console
python server/app.py
```

running:

```sh
cd client npm start 
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
cd client npm start 
```

## Validations 

Add validations to the `Books` model:

- must have a name

Add validations to the Bookstore` model:
- must have a name
- must have an address 

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
GET    /bookstore/             
POST   /bookstore/
```           

```console
GET    /bookstores/:id         
PATCH  /bookstores/:id         
DELETE /bookstores/:id
```      

## Serialize Rules
```console

FRONTEND (REACT) 
-
-
-
```
```console
EXTRA!
Stretch goals:
- Suggested Books List.
- User cart to be able to purchase books. 
-
```



