import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();
const lines = input.split('\n');

const puzzle: string[][] = lines.map(line => {
    return line.trim().split('').map(char=> String(char));
})

// Boolean function to check for matches of provided word variable
const canFindPuzzleWord = (puzzle: string[][], x_start: number, y_start:number, x_direction: number, y_direction: number, word: string): boolean => {
    const rows = puzzle.length;
    const columns = puzzle[0].length;

    for (let k = 0; k < word.length; k++) {
        const x = x_start + k * x_direction;
        const y = y_start + k * y_direction;

        // If out of bounds, return false.
        if (x < 0 || x >= rows || y < 0 || y >= columns) return false;
        // If letter does not match, return false
        if (puzzle[x][y] !== word[k]) return false;
    }

    return true;
}

const countOccurrences = (puzzle: string[][], word: string): number => {
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

const countOccurrencesInX = (puzzle: string[][], word: string): number => {
    let occurrences: number = 0;
    
    const directions = [
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



console.log("Solution part 1: " + countOccurrences(puzzle, 'XMAS'));
console.log("Solution part 2: " + countOccurrencesInX(puzzle, 'MAS'));