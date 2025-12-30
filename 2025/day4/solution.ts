import { createFileReader } from "@utils/helpers";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

const paperRollGrid: string[][] = puzzleLines.map(line => {
    return line.trim().split('').map(char => String(char));
});

// Locate all adjacents in grid
const gridAdjacents: [number, number][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1], 
]

/**
 * Count all adjacent paper rolls of current 'roll' in the grid
 * 
 * @param grid 
 * @param rowIndex 
 * @param columnIndex 
 * @returns 
 */
function countAdjacentsRolls(grid: string[][], rowIndex: number, columnIndex: number): number {
    let count = 0;
    const totalRows = grid.length;
    const totalColumns = grid[0]?.length ?? 0;

    for (const [rowOffset, columnOffset] of gridAdjacents) {
        const neighborRowIndex = rowIndex + rowOffset;
        const neighborColumnIndex = columnIndex + columnOffset;

        // Check for out of bounds
        const isOutsideGrid = 
            neighborRowIndex < 0 ||
            neighborRowIndex >= totalRows ||
            neighborColumnIndex < 0 ||
            neighborColumnIndex >= totalColumns;

        if (isOutsideGrid) {
            continue    // Skip invalid
        }

        const isPaperRoll = grid[neighborRowIndex]?.[neighborColumnIndex] === '@';
        if (isPaperRoll) {
            count++
        }
    }

    return count;
}

/**
 * Find solution to part one of day 4 puzzle
 * 
 * @param grid 
 * @returns 
 */
function findMovableRolls(grid: string[][]): number {
    let movableRolls = 0;

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex]?.length; columnIndex++) {
            if (grid[rowIndex]?.[columnIndex] === '@' && countAdjacentsRolls(grid, rowIndex, columnIndex) < 4) {
                movableRolls++;
            }
        }
    }

    return movableRolls;
}

// Get the solution for part one
const resultPartOne = findMovableRolls(paperRollGrid);
console.log("Solution part one: " + resultPartOne);

/**
 * Helper function for part two.
 * Remove valid paper rolls from the grid
 * 
 * @param grid 
 * @returns 
 */
function findAndRemoveRoll(grid: string[][]): string[][] {
    let newGrid = grid.map(row => [...row]);

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex]?.length; columnIndex++) {
            if (grid[rowIndex]?.[columnIndex] === '@' && countAdjacentsRolls(grid, rowIndex, columnIndex) < 4) {
                newGrid[rowIndex][columnIndex] = 'x';
            }
        }
    }

    return newGrid;
}

/**
 * Solve day 4 part two
 * Find and remove paper rolls, until nomore can be removed
 * 
 * @param grid 
 * @returns 
 */
function findAllMovableRolls(grid: string[][]): number {
    let totalMovableRolls = 0;
    let canStillRemoveMore = true;
    let newGrid = grid.map(row => [...row]);
    
    while (canStillRemoveMore) {
        if (findMovableRolls(newGrid) > 0) {
            totalMovableRolls += findMovableRolls(newGrid);
            newGrid = findAndRemoveRoll(newGrid);
        } else {
            canStillRemoveMore = false;
        }
    }

    return totalMovableRolls;
}

// Get the solution for part two
const resultPartTwo = findAllMovableRolls(paperRollGrid);
console.log("Solution part two: " + resultPartTwo)
