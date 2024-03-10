#!/usr/bin/python3
"""Island Perimeter Problem
"""


def island_perimeter(grid):
    """Returns the perimeter of the island described in grid"""
    perimeter = 0
    rows, cols = len(grid), len(grid[0])

    for row in range(rows):
        for col in range(cols):
            if grid[row][col] == 1:
                perimeter += 4  # Assuming it's a land cell
                # Check adjacent cells to subtract the shared edges
                if row > 0 and grid[row - 1][col] == 1:
                    perimeter -= 2
                if col > 0 and grid[row][col - 1] == 1:
                    perimeter -= 2

    return perimeter
