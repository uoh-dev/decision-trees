import os
from flask import g, current_app
from yaml import safe_load
from backend.database.mongodb import Database


def get_db():
    if 'db' not in g:
        with open(os.path.join(current_app.root_path, "database_secret.yml")) as stream:
            g.db = Database(safe_load(stream))

    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_app(app):
    app.teardown_appcontext(close_db)
