from flask import Blueprint, request, abort
from backend.db import get_db
from backend.tools.validator import validator
from backend.tools import schemas

bp = Blueprint('tree', __name__, url_prefix="/tree")


@bp.route('/', methods=['GET'])
@validator(schemas.id_schema)
def get_tree():
    db = get_db()
    if not (tree := db.retrieve_tree(request.args["id"])):
        return abort(404, f"tree with id {request.args['id']} not found")

    tree['_id'] = str(tree['_id'])
    return tree


@bp.route('/', methods=['POST'])
@validator(schemas.tree_schema)
def post_tree():
    db = get_db()
    request_tree = request.get_json()
    db.insert_tree(request_tree)
    request_tree['_id'] = str(request_tree['_id'])
    return request.get_json()
