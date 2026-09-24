import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();

const solvePartOne = (corruptedText: string): number => {
    let totalSum: number = 0;
    const regex = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g; // Regex for finding instances of "mul(value,value)"
    
    const mulMatches = corruptedText.matchAll(regex);
    
    for (const match of mulMatches) {
        const firstValue: number = parseInt(match[1], 10);
        const secondValue: number = parseInt(match[2], 10);
    
        totalSum += (firstValue * secondValue);
    }
    return totalSum;
}

const solvePartTwo = (corruptedText: string): number => {
    let totalSum: number = 0; // Number of non-corrupted multiplications found
    const regex = /do\(\)|don't\(\)|mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g; 
    let readInput: boolean = true;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(corruptedText)) !== null) {
        const found = match[0];

        if (found === "do()") {
            // Start reading mul(val,val) again
            readInput = true;
        } else if (found === "don't()") {
            readInput = false;
        } else if (found.startsWith("mul(")) {
            if (readInput) {
                const firstValue: number = parseInt(match[1], 10);
                const secondValue: number = parseInt(match[2], 10); 
                totalSum += (firstValue * secondValue);
            }
        }
    }
    return totalSum;
}


console.log("Part one solution: " + solvePartOne(input));
console.log("Part two solution: " + solvePartTwo(input));