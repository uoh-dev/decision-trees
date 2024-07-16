from flask import Blueprint
from backend.g_items import get_db


bp = Blueprint('measurements', __name__, url_prefix="/measurements")


@bp.route('/', methods=['GET'])
def get_measurements():
    db = get_db()
    measurements = db.retrieve_measurements()
    print(measurements)
    return measurements
