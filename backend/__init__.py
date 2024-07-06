from flask import Flask
from backend import db
from backend.endpoints import tree


def create_app():
    app = Flask(__name__)

    app.register_blueprint(tree.bp)

    from . import db
    db.init_app(app)

    # flask --app backend run
    # flask --app backend run --port xxxx
    return app
