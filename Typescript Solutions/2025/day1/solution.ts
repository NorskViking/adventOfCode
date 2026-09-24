import { createFileReader } from "../../utils/helpers"

// Read input files
const reader = createFileReader(import.meta.url)
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

//const rotation_direction: string[] = [];
//const rotation_number: number[] = [];

type parsedInput = [string, number];

function parseInputData(line: string): parsedInput {
    return [line[0]!, parseInt(line.slice(1), 10)];
}


function puzzleSolverPartOne(lines: string[]): number {
    let occurrencesOfZero: number = 0;
    let position = 50;
    const WHEEL_SIZE = 100;

    for (const line of lines) {
        const [direction, amount] = parseInputData(line);

        if (direction === 'L') {
            position -= amount;
        } else if (direction === 'R') {
            position += amount;
        }

        position = ((position % WHEEL_SIZE) + WHEEL_SIZE) % WHEEL_SIZE;
        
        if (position === 0) {
            occurrencesOfZero++;
        }

    }
    return occurrencesOfZero;
}

const solution: number = puzzleSolverPartOne(puzzleLines);
console.log("solution part one: " + solution);

function puzzleSolverPartTwo(lines: string[]): number {
    let occurrencesOfZero: number = 0;
    let position = 50;

    for (const line of lines) {
        const [direction, amount] = parseInputData(line);
        const startPosition = position;

        let newPosition: number;
        if (direction === 'L') {
            newPosition = startPosition - amount;
        } else if (direction === 'R') {
            newPosition = startPosition + amount;
        } else {
            continue;
        }

        if (startPosition % 100 !== 0) {
            if (direction === 'L') {
                let count = 0;
                for (let p = newPosition; p < startPosition; p++) {
                    if (p % 100 === 0) count++;
                }
                occurrencesOfZero += count;
            } else if (direction === 'R') {
                let count = 0;
                for (let p = newPosition + 1; p <= newPosition; p++) {
                    if (p % 100 === 0) count++;
                }
                occurrencesOfZero += count;
            }
        } else {
            // if starting at zero, only count if making complete rotations
            if (Math.abs(newPosition - startPosition) >= 100) {
                const completeRotations = Math.floor(Math.abs(newPosition - startPosition) / 100);
                occurrencesOfZero += completeRotations;
            }
        }

        position = ((newPosition % 100) + 100) % 100;
    }
    return occurrencesOfZero;
}

console.log("solution part two: " + puzzleSolverPartTwo(puzzleLines))
