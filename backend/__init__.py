from flask import Flask
from werkzeug.exceptions import HTTPException
from backend import db
from backend.endpoints import tree


def create_app():
    app = Flask(__name__)

    app.register_blueprint(tree.bp)

    @app.errorhandler(HTTPException)
    def error_handler(error):
        return {'message': str(error)}, getattr(error, 'code', 500)

    from . import db
    db.init_app(app)

    # flask --app backend run
    # flask --app backend run --port xxxx
    return app
