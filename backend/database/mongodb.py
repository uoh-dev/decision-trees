from typing import Mapping
from pymongo import MongoClient
from bson.objectid import ObjectId
import click


class Database:
    def __init__(self, auth_dict: dict):
        self.client = MongoClient(
            host=auth_dict['host'],
            port=auth_dict['port'],
            username=auth_dict['username'],
            password=auth_dict['password'],
            authSource=auth_dict['database']
        )

        self.db = self.client[auth_dict['database']]
        click.echo(f'Connected to MongoDB-database {auth_dict["database"]}.')

        self.example = {
            "name": "hallo",
            "description": "das ist ein baum",
            "tree": [
                {"measurement": "length", "threshold": 100, "index": 0},
                {"measurement": "length", "threshold": 100, "index": 1},
                {"measurement": "length", "threshold": 100, "index": 2},
                {"measurement": "length", "threshold": 100, "index": 5},
                {"measurement": "length", "threshold": 100, "index": 6},
                {"measurement": "length", "threshold": 100, "index": 14},
                {"measurement": "length", "threshold": 100, "index": 15},
            ],
            "log": "Added 1, Added 2, Added 3, Added 4"
        }

    def retrieve_measurements(self):
        return list(
            self.db['measurements'].aggregate(
                pipeline=[
                    {'$group': {'_id': None, 'names': {'$push': '$name'}}}
                ]
            )
        )[0]['names']

    def retrieve_athletes(self, limit: int) -> list[Mapping]:
        return list(
            self.db['athletes'].find(
                projection={
                    "_id": 0
                }
            ).limit(limit)
        )

    def retrieve_tree(self, tree_id: str):
        return self.db['trees'].find_one(
            filter={
                "_id": ObjectId(tree_id)
            },
            projection={
                "log": 0
            }
        )

    def retrieve_trees(self, limit: int):
        # TODO: not functional yet
        return list(
            self.db['trees'].find(
                projection={
                    "tree": {"$size": "$tree"},
                    "log": 0
                }
            ).limit(limit)
        )

    def insert_tree(self, tree: dict):
        self.db['trees'].insert_one(tree)

    def close(self):
        self.client.close()
