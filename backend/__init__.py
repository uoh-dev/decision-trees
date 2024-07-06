import click
from flask import Flask
from yaml import safe_load


def create_app():
    app = Flask(__name__)
    app.config.from_file("database_secret.yml", load=safe_load)
    click.echo(app.config["database"])

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    import db
    #db.init_app(app)

    # flask --app backend run --port xxxx
    return app
