from flask import Blueprint, request, abort
from backend.g_items import get_db
from backend.database.mongodb import Database
from backend.tools.validator import validator
from backend.tools.schemas.id import id_schema

bp = Blueprint('evaluation', __name__, url_prefix="/evaluation")


@bp.route('/', methods=['POST'])
@validator(id_schema)
def get_evaluation():
    db = get_db()
    if not (tree := db.retrieve_tree(request.args["id"])):
        return abort(404, f"tree with id {request.args['id']} not found")
    return _evaluate(db, tree)


def _evaluate(db: Database, tree: dict) -> list[dict[str, str]]:
    diagnoses = list()
    athletes = db.retrieve_all_athletes()

    # Modify measurement array to dictionary for faster access
    for athlete in athletes:
        measurement_dict = dict()
        for measurement in athlete['measurements']:
            measurement_dict[measurement['descriptor']] = measurement['value']

        athlete['measurements'] = measurement_dict

    # Traverse tree per athlete to determine diagnosis
    for athlete in athletes:
        diagnosis: dict[str, str] = {'name': athlete['name']}

        current_node = tree
        while current_node['type'] == 'tree':
            if athlete['measurements'][current_node['measurement']] <= current_node['threshold']:
                current_node = current_node['left']
            else:
                current_node = current_node['right']

        # current_node is now a leaf
        diagnosis['diagnosis'] = current_node['diagnosis']
        diagnoses.append(diagnosis)

    return diagnoses
