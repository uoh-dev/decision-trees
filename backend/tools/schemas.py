id_schema = {
    "type": "object",
    "properties": {
        "id": {"type": "string", "minLength": 1},
    },
    "required": ["id"],
    "additionalProperties": False
}

tree_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "description": {"type": "string"},
        "tree": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "measurement": {"type": "string", "minLength": 1},
                    "threshold": {"type": "number"},
                },
                "required": ["measurement", "threshold"],
            },
            "minItems": 1,
        },
        "log": {"type": "string"}
    },
    "required": ["name", "description", "tree", "log"],
    "additionalProperties": False
}
