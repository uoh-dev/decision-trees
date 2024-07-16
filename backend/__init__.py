from flask import Flask
from werkzeug.exceptions import HTTPException
from backend import g_items
from backend.endpoints import tree, trees, athletes, measurements, suggestion, evaluation


def create_app():
    app = Flask(__name__)

    blueprints = [
        tree.bp,
        trees.bp,
        athletes.bp,
        measurements.bp,
        suggestion.bp,
        evaluation.bp
    ]

    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    @app.errorhandler(HTTPException)
    def error_handler(error):
        return {'message': str(error)}, getattr(error, 'code', 500)

    from . import g_items
    g_items.init_app(app)

    # flask --app backend run
    # flask --app backend run --port xxxx
    return app
