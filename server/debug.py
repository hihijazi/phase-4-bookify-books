#!/usr/bin/env python3

from server.app import app
from server.models import db, Books, Customers, Orders

if __name__ == '__main__':
    with app.app_context():
        import ipdb; ipdb.set_trace()