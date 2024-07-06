import click
from pymongo import MongoClient


class Database:
    def __init__(self, auth_dict: dict):
        self.client = MongoClient(
            host=auth_dict['host'],
            port=auth_dict['port'],
            username=auth_dict['username'],
            password=auth_dict['password']
        )

        self.db = self.client[auth_dict['database']]
        click.echo(f"Connected to MongoDB-database {auth_dict['database']}.")

    def retrieve_measurements(self):
        pass

    def retrieve_athletes(self):
        pass

    def retrieve_tree(self):
        pass

    def retrieve_trees(self):
        pass

    def insert_tree(self):
        pass

    def close(self):
        self.client.close()
