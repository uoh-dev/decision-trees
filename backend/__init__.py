from flask import Flask
from werkzeug.exceptions import HTTPException
from backend import g_items
from backend.endpoints import tree, trees, athletes, measurements, suggestion


def create_app():
    app = Flask(__name__)

    for bp in [tree.bp, trees.bp, athletes.bp, measurements.bp, suggestion.bp]:
        app.register_blueprint(bp)

    @app.errorhandler(HTTPException)
    def error_handler(error):
        return {'message': str(error)}, getattr(error, 'code', 500)

    from . import g_items
    g_items.init_app(app)

    # flask --app backend run
    # flask --app backend run --port xxxx
    return app
