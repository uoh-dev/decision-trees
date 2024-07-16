from flask import Blueprint, request, abort, url_for
from backend.g_items import get_db
from backend.tools.validator import validator
from backend.tools.schemas.trees import trees_schema


bp = Blueprint('trees', __name__, url_prefix='/trees')


@bp.route('/', methods=['GET'])
@validator(trees_schema)
def get_trees():
    db = get_db()

    limit = int(request.args.get('limit', '1000'))
    offset = int(request.args.get('offset', '0'))

    trees, has_next = db.retrieve_trees(limit=limit, offset=offset)
    if trees is None:
        return abort(404)

    for tree in trees:
        tree['_id'] = str(tree['_id'])

    return {
        'data': trees,
        'next': url_for('trees.get_trees', limit=limit, offset=offset + limit, _external=True) if has_next else None,
    }
