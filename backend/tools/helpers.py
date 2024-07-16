from typing import Sequence


def unzip[T1, T2](ls: list[tuple[T1, T2]]) -> tuple[list[T1], list[T2]]:
    a, b = [list(el) for el in zip(*ls)]
    return a, b


def flatten[T](ls: list[Sequence[T]]) -> list[T]:
    return [el for seq in ls for el in seq]

