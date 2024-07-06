from flask import Blueprint, jsonify
from backend.db import get_db


bp = Blueprint('tree', __name__, url_prefix="/tree")


@bp.route('/test')
def test():
    db = get_db()
    return jsonify({"username": "irgendeinwertdenichmirausgedachthabe"})
