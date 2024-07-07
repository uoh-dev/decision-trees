from flask import Blueprint, request, abort, url_for
from backend.db import get_db
from backend.tools.validator import validator
from backend.tools import schemas

bp = Blueprint('trees', __name__, url_prefix='/trees')


@bp.route('/', methods=['GET'])
@validator(schemas.trees_schema)
def get_trees():
    db = get_db()

    limit = int(request.args.get('limit', '1000'))
    offset = int(request.args.get('offset', '0'))

    # Retrieve one additional tree to determine if there are more trees to fetch
    trees = db.retrieve_trees(limit=limit+1, offset=offset)
    if trees is None:
        return abort(404)

    # If more than the requested amount is fetched, there are more trees to fetch
    has_next = len(trees) == limit + 1

    # Remove the additional tree if the retrieved amount exceeds the requested amount
    trees = trees if len(trees) <= limit else trees[:-1]

    for tree in trees:
        tree['_id'] = str(tree['_id'])

    return {
        'data': trees,
        'next': url_for('trees.get_trees', limit=limit, offset=offset+limit, _external=True) if has_next else None,
    }
