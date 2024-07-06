from flask import g
import backend.database.mongo_db as mongodb
import click


def get_db():
    if 'db' not in g:
        g.db = mongodb.connect()

    return g.db


@click.command('init-db')
def init_db_command():
    db = get_db()
    db.start()
    click.echo('Database started')


def close_db():
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

"""
context enthält informationen für die request, welche sich die verschiedenen endpoints teilen können, aber
verschiedene requests sich weiterhin nicht beeinflussen


current_app: instance of the active application
g: temp storage during handling of request and reset in each request

request: content of http request
session: dict with values that are remembered between requests


app_context.push() macht current_app und g available
request_context.push() für die anderen beiden
"""
