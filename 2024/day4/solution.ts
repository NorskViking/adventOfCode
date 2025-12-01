import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();
const lines = input.split('\n');

const puzzle: string[][] = lines.map(line => {
    return line.trim().split('').map(char=> String(char));
})

// Helper function for part 2, to see that the "arms" of the X is in bounds of the array
const inBounds = (rows: number, columns: number, x: number, y: number): boolean => {
    return x >= 0 && x < rows && y >= 0 && y < columns;
}

// Boolean function to check for matches of provided word variable
const canFindPuzzleWord = (puzzle: string[][], x_start: number, y_start:number, x_direction: number, y_direction: number, word: string): boolean => {
    const rows = puzzle.length;
    const columns = puzzle[0].length;

    for (let k = 0; k < word.length; k++) {
        const x = x_start + k * x_direction;
        const y = y_start + k * y_direction;

        // If out of bounds, return false.
        if (!inBounds(rows, columns, x, y)) return false;
        // If letter does not match, return false
        if (puzzle[x][y] !== word[k]) return false;
    }

    return true;
}

const solvePartOne = (puzzle: string[][], word: string): number => {
    let occurrences: number = 0;
    
    const directions = [
        {xDirection: 0, yDirection: 1}, // Left to right
        {xDirection: 0, yDirection: -1}, // Right to left
        {xDirection: 1, yDirection: 0}, // Top to bottom
        {xDirection: -1, yDirection: 0}, // Bottom to top
        {xDirection: 1, yDirection: 1}, // Diagonal down-right
        {xDirection: 1, yDirection: -1}, // Diagonal down-left
        {xDirection: -1, yDirection: 1}, // Diagonal up-right
        {xDirection: -1, yDirection: -1} // Diagonal up-left
    ]

    const rows = puzzle.length;
    const columns = puzzle[0].length;

    for (let i = 0; i < rows; i++) {
        for (let y = 0; y < columns; y++) {
            if (puzzle[i][y] !== word[0]) continue; // Skip if letter does not match first letter of word.

            // Check each direction
            for (const {xDirection, yDirection} of directions) {
                if (canFindPuzzleWord(puzzle, i, y, xDirection, yDirection, word)) {
                    occurrences++;
                }
            }
        }
    }

    return occurrences;
}

// Using the middle char of the word, confirm that it forms an X of the word
/**
const isXShape = (puzzle: string[][], centerRow: number, centerColumn: number, word: string, centerIndex: number): boolean => {
    const rows = puzzle.length;
    const columns = puzzle[0].length;

    // Check letters before the center going upwards
    for (let i = 1; i <= centerIndex; i++) {
        const char = word[centerIndex - i];

        // Top-left arm: (centerRow - i, centerColumn - i)
        if (!inBounds(rows, columns, centerRow - i, centerColumn - i) || puzzle[centerRow - i][centerColumn - i] !== char) {
            return false;
        }

        // Top-right arm: (centerRow - i, centerColumn + i)
        if (!inBounds(rows, columns, centerRow - i, centerColumn + i) || puzzle[centerRow - i][centerColumn + i] !== char) {
            return false;
        }
    }

    // Check letters after the center going downwards
    for (let i = 1; i <= (word.length - 1 - centerIndex); i++) {
        const char = word[centerIndex + i];

        // Bottom-left arm: (centerRow + i, centerColumn - i)
        if (!inBounds(rows, columns, centerRow + i, centerColumn - i) || puzzle[centerRow + i][centerColumn - i] !== char) {
            return false;
        }

        // Bottom-right arm: (centerRow + i, centerColumn + i)
        if (!inBounds(rows, columns, centerRow + i, centerColumn + i) || puzzle[centerRow + i][centerColumn + i] !== char) {
            return false;
        }
    }

    return true;
}
*/

// A more direct function that only test for allowed MAS or SAM forming an X
const isXMas = (puzzle: string[][], centerRow: number, centerColumn: number): boolean => {
    const rows = puzzle.length;
    const columns = puzzle[0].length;
    const validWord = ['MAS', 'SAM'];

    // Make certain that the coordinates are inside of the array
    const safeGet = (x: number, y:number): string | null => {
        if (!inBounds(rows, columns, x, y)) {
            return null;
        }
        return puzzle[x][y]
    }

    // Define positions that form an X around the center coordinate
    const positions = {
        topLeft: [centerRow - 1, centerColumn - 1],
        topRight: [centerRow - 1, centerColumn + 1],
        bottomLeft: [centerRow + 1, centerColumn - 1],
        bottomRight: [centerRow + 1, centerColumn + 1],
    };

    // Get the chars located in the positions around the center character
    const chars = {
        topLeft: safeGet(positions.topLeft[0], positions.topLeft[1]),
        topRight: safeGet(positions.topRight[0], positions.topRight[1]),
        bottomLeft: safeGet(positions.bottomLeft[0], positions.bottomLeft[1]),
        bottomRight: safeGet(positions.bottomRight[0], positions.bottomRight[1]),
    }

    const centerChar = safeGet(centerRow, centerColumn);

    if (centerChar === null) {
        return false
    }

    // Create words formed in an X around the center character
    const diagonalOne = (chars.topLeft ?? '') + centerChar + (chars.bottomRight ?? '');
    const diagonalTwo = (chars.topRight ?? '') + centerChar + (chars.bottomLeft ?? '');

    // If the diagonal words are of either MAS or SAM, return true
    return validWord.includes(diagonalOne) && validWord.includes(diagonalTwo);
}

const solvePartTwo = (puzzle: string[][], word: string):number => {
    let occurrences: number = 0;

    const reversedWord = word.split('').reverse().join('');
    const rows = puzzle.length;
    const columns = puzzle[0].length;
    const length = word.length;
    if (length % 2 === 0) {
        throw new Error("Word must be odd-numbered in length to be valid for this test")
    }

    const centerIndex = Math.floor(length / 2);

    for (let i = 0; i < rows; i++) {
        for (let y = 0; y < columns; y++) {
            if (puzzle[i][y] === word[centerIndex]) {
                // Find forward occurrences
                if (isXMas(puzzle, i, y)) {
                    occurrences++;
                }
            }
        }
    }

    return occurrences;
}

console.log("Solution part 1: " + solvePartOne(puzzle, 'XMAS'));
console.log("Solution part 2: " + solvePartTwo(puzzle, 'MAS'));