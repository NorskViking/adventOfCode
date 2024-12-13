import * as fs from 'fs';
import * as path from 'path';

// Read the input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();
const lines = input.split('\n');

// Create arrays for each column of values
const column1: number[] = [];
const column2: number[] = [];

// Populate the arrays with the values from Input
for (const line of lines) {
    const [value1, value2] = line.trim().split(/\s+/);

    column1.push(Number(value1));
    column2.push(Number(value2));
}

// Sort the arrays by ascending value
const column1sorted = column1.sort((a, b) => a - b);
const column2sorted = column2.sort((a, b) => a - b);

// Function to test which number is higher, and return the difference
const findDifference = (value1: number, value2: number) => {
    if (value1 >= value2) {
        return value1 - value2;
    }
    return value2 - value1;
}

// For each value in the arrays, find the difference and add the value to find the solution for part 1 of day 1.
let solutionPartOne: number = 0;

for (let index in column1sorted) {
    let difference: number = findDifference(column1sorted[index], column2sorted[index]);
    solutionPartOne += difference;
}

console.log(solutionPartOne)

// Find the frequency of a given value in an array
const frequency = (array: number[], value: number) => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            count++;
        }
    }
    return count;
}

let similarityScore = 0;

// For each value in column 1, find the frequency of that value in column 2,
// Multiply the value of the number with the number of occurrences,
// Add that result to the similarity score.
for (let value of column1sorted) {
    similarityScore += (value * frequency(column2sorted, value))
}

console.log(similarityScore);