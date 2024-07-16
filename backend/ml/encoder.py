from sklearn.preprocessing import LabelEncoder
from backend.database.mongodb import Database
from backend.tools.types import Content


class Encoder:
    def __init__(self, database: Database):
        self._encoder = LabelEncoder()
        self.measurement_mapping = database.retrieve_measurement_mapping()

        # Load measurement encoding mapping if it already exists
        if self.measurement_mapping and all([encoded is not None for _, encoded in self.measurement_mapping]):
            self.map = dict(self.measurement_mapping)
        else:
            measurements = database.retrieve_measurements()
            if not measurements:
                raise Exception('LabelEncoder cannot be created: No measurements stored in database.')

            print("Fitting Labels.")
            self._encoder.fit(measurements)

            # Store mapping in database
            classes = self._encoder.classes_
            encoded_classes = map(lambda x: int(x) + 1, self._encoder.transform(self._encoder.classes_))
            mapping = list(zip(classes, encoded_classes))
            database.update_measurement_labels(mapping)

            self.map = dict(mapping)

    def encode(self, measurement: str) -> int:
        return self.map[measurement]

    def decode(self, decoded_measurement: int) -> str:
        # Inverse dict access
        return [key for key, value in self.map.items() if value == decoded_measurement][0]

    def encode_node(self, node: dict) -> Content:
        return self.map[node['measurement']], node['threshold']
