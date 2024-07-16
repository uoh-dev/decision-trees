tree_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "description": {"type": "string"},
        "tree": {
            "type": "object"
        },
        "log": {"type": "string"}
    },
    "required": ["name", "description", "tree", "log"],
    "additionalProperties": False
}