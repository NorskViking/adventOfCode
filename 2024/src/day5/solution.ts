import { match } from 'assert';
import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');
//const lines = input.split('\n');

const rules: [number, number][] = [];
const updates: number[][] = [];

const reportSeparator = input.findIndex(line => line.trim() === '');

for (let i = 0; i < reportSeparator; i++) {
    const [valueOne, valueTwo] = input[i].split('|');
    const num1 = parseInt(valueOne);
    const num2 = parseInt(valueTwo);
    rules.push([num1, num2]);
}


for (let y = reportSeparator + 1; y < input.length; y++) {
    const line = input[y];
    if (line) {
        const pages = line.split(',').map(page => parseInt(page.trim(), 10));
        updates.push(pages);
    }
}

const isValidUpdate = (rules: number[][], update: number[]): boolean => {

    for (const rule of rules) {
        for (let i = 0; i < update.length; i++) {
            if (update.indexOf(rule[0]) >= update.indexOf(rule[1]) && update.indexOf(rule[0]) !== -1 && update.indexOf(rule[1]) !== -1) {
                //console.log("rule 1 index: " +update.indexOf(rule[0]) + ", rule 2 index: " + update.indexOf(rule[1]));
                return false;
            }
        }
    }

    return true;
}

const solvePartOne = (rules: number[][], updates: number[][]): number => {
    let middlePageSum: number = 0;

    isValidUpdate(rules, updates[0]);
    
    for (const update of updates) {
        //console.log(update)
        if (isValidUpdate(rules, update)) {
            const middleIndex = Math.floor(update.length / 2);
            //console.log(middleIndex)
            //console.log(update[middleIndex])
            middlePageSum += update[middleIndex];
        };
    }
    return middlePageSum;
}

console.log("Solution part 1: " + solvePartOne(rules, updates))