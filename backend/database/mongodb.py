from typing import Mapping
from pymongo import MongoClient, UpdateOne
from bson.objectid import ObjectId


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
        print(f'Connected to MongoDB-database {auth_dict["database"]}.')

    def retrieve_measurements(self):
        return list(
            self.db['measurements'].aggregate(
                pipeline=[
                    {'$group': {'_id': None, 'names': {'$push': '$name'}}}
                ]
            )
        )[0]['names']

    def retrieve_athletes(self, limit: int, offset: int) -> tuple[list[Mapping], bool]:
        result = list(
            self.db['athletes'].find(
                projection={
                    "_id": 0
                }
            ).limit(limit+1).skip(offset)
        )

        has_next = len(result) > limit
        return result[:limit], has_next

    def retrieve_tree(self, tree_id: str):
        if not ObjectId.is_valid(tree_id):
            return []

        return self.db['trees'].find_one(
            filter={
                "_id": ObjectId(tree_id)
            },
            projection={
                "log": 0
            }
        )

    def retrieve_trees(self, limit: int, offset: int) -> tuple[list[Mapping], bool]:
        pipeline = [
            {
                "$project": {
                    "name": 1,
                    "description": 1,
                    "amount_nodes": {"$size": "$tree"},
                }
            },
            {
                "$skip": offset
            },
            {
                "$limit": limit+1
            }
        ]

        result = list(self.db['trees'].aggregate(pipeline))
        has_next = len(result) > limit

        return result[:limit], has_next

    def retrieve_all_trees(self):
        return list(
            self.db['trees'].find()
        )

    def insert_tree(self, tree: dict):
        self.db['trees'].insert_one(tree)

    def insert_measurements(self, measurements: str) -> None:
        self.db['measurements'].insert_many(
            [
                {
                    "name": measurement,
                    "label": None
                } for measurement in measurements
            ]
        )

    def retrieve_measurement_mapping(self) -> list[tuple[str, int]]:
        data = self.db['measurements'].find()
        return [(measurement_object['name'], measurement_object['label']) for measurement_object in data]

    def update_measurement_labels(self, mapping: list[tuple[str, int]]) -> None:
        updates = [
            UpdateOne({'name': measurement}, {'$set': {'label': label}}) for measurement, label in mapping
        ]
        self.db['measurements'].bulk_write(updates)

    def close(self):
        self.client.close()
