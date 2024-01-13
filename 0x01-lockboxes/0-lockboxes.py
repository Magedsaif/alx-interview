#!/usr/bin/python3
"""Determines if all the boxes can be opened."""


def canUnlockAll(boxes):
    """Determines if all the boxes can be opened.

    Args:
        boxes (list): A list of lists. Each index contains a list of numbers
        representing the keys to the boxes.

    Returns:
        bool: True if all boxes can be opened, False if otherwise.
    """
    if not boxes:
        return False

    keys = [0]
    for key in keys:
        for box in boxes[key]:
            if box not in keys and box < len(boxes):
                keys.append(box)

    if len(keys) == len(boxes):
        return True
    return False
