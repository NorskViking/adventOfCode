import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'test_input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();
const lines = input.split('\n');

const puzzle: string[][] = lines.map(line => {
    return line.trim().split('').map(char=> String(char));
})

let numberOfXmas: number = 0;

// Find horizontal left to right occurrences
for (let i:number = 0; i < puzzle.length; i++) {
    for (let y: number = 0; y < puzzle[i].length; y++) {
        if (puzzle[i][y] === 'X' && i < puzzle.length) {
            if (puzzle[i][y+1] === 'M') {
                if (puzzle[i][y+2] === 'A') {
                    if (puzzle[i][y+3] === 'S') {
                        numberOfXmas += 1;
                    }
                }
            }
        }
    }
}

// Find horizontal right to left occurrences
for (let i:number = 0; i < puzzle.length; i++) {
    for (let y: number = 0; y < puzzle[i].length; y++) {
        if (puzzle[i][y] === 'X' && i < puzzle.length) {
            if (puzzle[i][y-1] === 'M') {
                if (puzzle[i][y-2] === 'A') {
                    if (puzzle[i][y-3] === 'S') {
                        numberOfXmas += 1;
                    }
                }
            }
        }
    }
}

// Find vertical downward occurrences
for (let i:number = 0; i < puzzle.length; i++) {
    for (let y: number = 0; y < puzzle[i].length; y++) {
        if ((i+3) > puzzle.length) {
            break;
        }
        if (puzzle[i][y] === 'X') {
            if (puzzle[i+1][y] === 'M') {
                if (puzzle[i+2][y] === 'A') {
                    if (puzzle[i+3][y] === 'S') {
                        numberOfXmas += 1;
                    }
                }
            }
        }
    }
}

// Find vertical upward occurrences
for (let i:number = 0; i < puzzle.length; i++) {
    for (let y: number = 0; y < puzzle[i].length; y++) {
        if (i > 3) { // start at line 3
            if (puzzle[i][y] === 'X') {
                if (puzzle[i-1][y] === 'M') {
                    if (puzzle[i-2][y] === 'A') {
                        if (puzzle[i-3][y] === 'S') {
                            numberOfXmas += 1;
                        }
                    }
                }
            }
        }
    }
}

// Find diagonal down to left
for (let i:number = 0; i < puzzle.length; i++) {
    for (let y: number = 0; y < puzzle[i].length; y++) {
        if ((i+3) > puzzle.length) {
            console.log("broke")
            break;
        }
        if (puzzle[i][y] === 'X' && (puzzle[i][y+3] !== undefined)) {
            console.log("found x")
            if (puzzle[i+1][y+1] === 'M') {
                console.log("found m")
                if (puzzle[i+2][y+2] === 'A') {
                    console.log("found a")
                    if (puzzle[i+3][y+3] === 'S') {
                        numberOfXmas += 1;
                        console.log("found")
                    }
                }
            }
        }
    }
}

// Find diagonal up to left
/**
for (let i:number = 0; i < puzzle.length; i++) {
    for (let y: number = 0; y < puzzle[i].length; y++) {
        if (i+3 > puzzle.length) { // start at line 3
            if (puzzle[i][y] === 'X') {
                if (puzzle[i-1][y] === 'M') {
                    if (puzzle[i-2][y] === 'A') {
                        if (puzzle[i-3][y] === 'S') {
                            numberOfXmas += 1;
                        }
                    }
                }
            }
        }
    }
}
*/

console.log("num: " + numberOfXmas)