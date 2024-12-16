import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();

const regexOfValidMul = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;

const mulMatches = input.matchAll(regexOfValidMul);

let totalSum: number = 0;

for (const match of mulMatches) {
    const firstValue: number = parseInt(match[1], 10);
    const secoundValue: number = parseInt(match[2], 10);

    totalSum += (firstValue * secoundValue);
}

console.log(totalSum);