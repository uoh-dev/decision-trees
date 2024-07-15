trees_schema = {
    "type": "object",
    "properties": {
        "limit": {
            "type": "string",
            "minLength": 1,
            "pattern": "^[0-9]\\d*$",
            "error_message": "Limit must be a natural number."
        },
        "offset": {
            "type": "string",
            "minLength": 1,
            "pattern": "^[0-9]\\d*$",
            "error_message": "Offset must be a natural number."
        },
    },
    "additionalProperties": False
}