from functools import wraps
from jsonschema import validate, ValidationError
from flask import request, abort


def validator(schema):  # decorator factory to parameterize the decorator with schemas
    def decorator(function):
        @wraps(function)
        def wrapper():
            try:
                if request.content_type == 'application/json':
                    validate(request.json, schema)
                elif request.args:
                    validate(request.args, schema)
                else:
                    return abort(400, "Invalid request format")
            except ValidationError as e:
                return abort(400, e.message)

            return function()
        return wrapper
    return decorator