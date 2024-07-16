import os
from flask import g, current_app
from yaml import safe_load
from backend.database.mongodb import Database
from backend.ml.node_predictor import NodePredictor


def get_db() -> Database:
    if 'db' not in g:
        with open(os.path.join(current_app.root_path, "database_secret.yml")) as stream:
            g.db = Database(safe_load(stream))

    return g.db


def get_predictor() -> NodePredictor:
    if 'predictor' not in g:
        g.predictor = NodePredictor(get_db())

    return g.predictor


def predictor_exists() -> bool:
    return 'predictor' in g


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_app(app):
    app.teardown_appcontext(close_db)
