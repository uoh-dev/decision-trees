from flask import Blueprint, request
from backend.g_items import get_predictor


bp = Blueprint('suggestion', __name__, url_prefix='/suggestion')


@bp.route('/', methods=['POST'])
def post_suggestion():
    marked_tree = request.get_json()

    measurement, threshold = get_predictor().predict(marked_tree)
    return {
        'measurement': measurement,
        'threshold': threshold
    }
