from flask import Blueprint, request, abort, url_for
from backend.db import get_db


bp = Blueprint('athletes', __name__, url_prefix="/athletes")


@bp.route('/', methods=['GET'])
def get_athletes():
    db = get_db()
    limit = int(request.args.get('limit', '1000'))
    offset = int(request.args.get('offset', '0'))

    athletes, has_next = db.retrieve_athletes(limit=limit, offset=offset)
    if athletes is None:
        return abort(404)

    return {
        'data': athletes,
        'next': url_for('athletes.get_athletes', limit=limit, offset=offset+limit, _external=True) if has_next else None,
    }

