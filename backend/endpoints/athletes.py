from random import randrange
from flask import Blueprint, request, abort, url_for
from backend.g_items import get_db


bp = Blueprint('athletes', __name__, url_prefix="/athletes")
DUMMYNAMES = [
    'Thorsten Götze', 'Maritta Kuhlmann', 'Mandy Neumann', 'Tim Wetzel', 'Heinz Hauck', 'Gerrit Mueller',
    'Friederike Reif', 'Cathrin Thomsen', 'Patricia Grote', 'Adalbert Kessler', 'Rose Wahl',
    'Albin Drechsler', 'Eckard Knobloch', 'Monica Ebner', 'Mirjam Bernhard', 'Bianka Probst',
    'Margareta Pilz', 'Juan Schwab', 'Henrik Faust', 'Johanne Sauter', 'Dominic Habermann',
    'Marta Heidenreich', 'Ingo Marquardt', 'Jan Eggert', 'Dana Fritsche', 'Jens-Peter Borchert',
    'Jessica Paulsen', 'Almut Henke', 'Fridolin Kramer', 'Reimund Lenz', 'Lilo Lehmann', 'Michael Scherer',
    'Roswita Grau', 'Lilli Schütz', 'Joseph Hinz', 'René Kühn', 'Arthur Menzel', 'Marion Weise',
    'Gertraude Helm', 'Sophia Groth', 'Nathalie Sailer', 'Adrian Wolter', 'Ernestine Keller',
    'Kai-Uwe Maurer', 'Lars Reimer', 'Heinrich Erdmann', 'James Schaper', 'Marlene Klein',
    'Ulrich Dietz', 'Enrico Ries'
]


@bp.route('/insert', methods=['GET'])
def get_athlete_synth():
    db = get_db()
    db.db['athletes'].insert_many([
        {
            "name": name,
            "measurements": [
                {
                    "descriptor": descriptor,
                    "value": randrange(0, 100)
                } for descriptor in db.retrieve_measurements()
            ]
        } for name in DUMMYNAMES
    ])
    return dict()


@bp.route('/', methods=['GET'])
def get_athletes():
    db = get_db()
    limit = int(request.args.get('limit', '1000'))
    offset = int(request.args.get('offset', '0'))

    athletes, has_next = db.retrieve_athletes(limit=limit, offset=offset)
    if athletes is None:
        return abort(404)

    next_url = url_for('athletes.get_athletes', limit=limit, offset=offset+limit, _external=True) if has_next else None

    return {
        'data': athletes,
        'next': next_url
    }

