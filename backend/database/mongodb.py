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

