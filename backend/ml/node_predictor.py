from sklearn.multioutput import MultiOutputRegressor
from sklearn.ensemble import RandomForestRegressor
from backend.database.mongodb import Database
from backend.ml.encoder import Encoder
from backend.ml.preprocessing import preprocess_trees, preprocess_feature
from sklearn.exceptions import NotFittedError


class NodePredictor:
    def __init__(self, database: Database):
        self.database = database
        self.encoder = Encoder(database)
        self.max_path_length = 3
        self.n_estimators = 100
        self.model = self._create_model()

        trees = [tree['tree'] for tree in self.database.retrieve_all_trees()]
        trees = [tree for tree in trees if tree['type'] != 'leaf']
        if len(trees) > 0:
            self.train(trees)

    def _create_model(self) -> MultiOutputRegressor:
        model = MultiOutputRegressor(RandomForestRegressor(self.n_estimators, warm_start=True))
        print('Created predictor instance.')
        return model

    @staticmethod
    def _find_feature(root: dict) -> list[tuple[str, float]]:
        # Traverse tree to find leaf that is marked
        stack = [([], root)]
        while stack:
            path, cur = stack.pop()
            if cur['type'] == 'tree':
                content = (cur['measurement'], cur['threshold'])
                stack.extend([
                    (path + [content], cur['left']),
                    (path + [content], cur['right'])
                ])
            else:
                if cur['marked']:
                    return path

        raise ValueError('Tree has no marked leaf.')

    def train(self, trees: list[dict] | dict) -> None:
        if trees is dict: trees = [trees]
        features, labels = preprocess_trees(trees, self.max_path_length, self.encoder)
        print('Training predictor on trees.')
        self.model.fit(features, labels)

    def predict(self, tree: dict) -> tuple[str, float]:
        feature = self._find_feature(tree)
        print('Predicting content of node.')
        try:
            prediction = self.model.predict([preprocess_feature(feature, self.encoder, self.max_path_length)])[0]
            return self.encoder.decode(int(prediction[0])), float(prediction[1])
        except NotFittedError as _:
            print('Model not fitted yet, prediction not possible.')
            return list(self.encoder.map.keys())[0], 0.


