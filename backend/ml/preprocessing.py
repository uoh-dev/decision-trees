from backend.ml.encoder import Encoder
from backend.tools.types import Path, Content, Feature
from backend.tools.helpers import unzip, flatten


def preprocess_trees(trees: list[dict], max_path_length: int, encoder: Encoder) -> tuple[list[Feature], list[Content]]:
    paths, contents = unzip(_get_datapoints(trees, encoder))

    # Adjust length of paths
    paths = _adjust_path_length(paths, max_path_length)
    return [flatten(path) for path in paths], contents


def preprocess_feature(path: list[tuple[str, float]], encoder: Encoder, max_path_length: int) -> Feature:
    encoded_path: Path = [(encoder.encode(measurement), threshold) for measurement, threshold in path]
    length_adjusted_path = _adjust_path_length([encoded_path], max_path_length)[0]
    return flatten(length_adjusted_path)


def _adjust_path_length(paths: list[Path], max_path_length: int) -> list[Path]:
    for i, path in enumerate(paths):
        # Pad path if it is too short
        if len(path) < max_path_length:
            paths[i] += [(0, 0)] * (max_path_length - len(path))

        # Truncate path if it is too long
        elif len(path) > max_path_length:
            paths[i] = path[len(path) - max_path_length:]

    return paths


def _get_datapoints(trees: list[dict], encoder: Encoder) -> list[tuple[Path, Content]]:
    all_datapoints: list[tuple[Path, Content]] = []
    for root in trees:
        datapoints = []
        _traverse_tree(root, datapoints, list(), encoder)
        all_datapoints.extend(datapoints)

    return all_datapoints


def _traverse_tree(node: dict, datapoints: list[tuple[Path, Content]], path: Path, encoder: Encoder) -> None:
    if not _is_leaf(node):
        content = _get_node_content(node, encoder)
        datapoints.append((path, content))
        _traverse_tree(node['left'], datapoints, path + [content], encoder)
        _traverse_tree(node['right'], datapoints, path + [content], encoder)


def _get_node_content(node: dict, encoder: Encoder) -> Content:
    return encoder.encode_node(node)


def _is_leaf(node: dict) -> bool:
    return node['type'] == 'leaf'
