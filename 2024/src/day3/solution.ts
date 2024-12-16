import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'test_input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();

const regexOfValidMul = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
const regexDo = /do()/;
const regexDont = /don't()/


const solvePartOne = (corruptedText: string): number => {
    let totalSum: number = 0;
    
    const mulMatches = corruptedText.matchAll(regexOfValidMul);
    
    for (const match of mulMatches) {
        const firstValue: number = parseInt(match[1], 10);
        const secoundValue: number = parseInt(match[2], 10);
    
        totalSum += (firstValue * secoundValue);
    }
    return totalSum;
}

const solvePartTwo = (corruptedText: string): number => {
    let totalSum: number = 0;

    return totalSum;
}


console.log("Part one solution: " + solvePartOne(input));
console.log("Part two solution: " + solvePartTwo(input));