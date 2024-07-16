tree_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "description": {"type": "string"},
        "tree": {
            "type": "object",
            "minItems": 1,
        },
        "log": {"type": "string"}
    },
    "required": ["name", "description", "tree", "log"],
    "additionalProperties": False
}