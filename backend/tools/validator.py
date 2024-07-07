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
                else:
                    validate(request.args, schema)
            except ValidationError as e:
                error_message = e.message if 'error_message' not in e.schema else e.schema['error_message']
                return abort(400, error_message)

            return function()
        return wrapper
    return decorator
