import { createFileReader } from "@utils/helpers";

// Read input files
const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

function puzzleNumbers(line: string): number[] {
    return [...line].map(d => parseInt(d, 10));
}

/**
 * Find highets possible joltage from sets of 'batteries' in a battery-bank, when turning on two batteries.
 * 
 * Example input:
 *  987654321111111 - highest possible: 98
 *  811111111111119 - highest possible: 89
 *  234234234234278 - highest possible: 78
 *  818181911112111 - highest possible: 92
 * 
 * @param lines
 * @returns 
 */
function puzzleSolverPartOne(lines: string[]): number {
    let joltageOutput: number = 0;

    for (const line of lines) {
        const batteryBank: number[] = puzzleNumbers(line) || [0];
        
        let firstBatteryPosition = 0;
        let firstBatteryValue = batteryBank[0] || 0;
        
        for (let i = 0; i < batteryBank.length -1; i++) {
            if (batteryBank[i]! > firstBatteryValue) {
                firstBatteryValue = batteryBank[i]!;
                firstBatteryPosition = i;
            }
        }

        const secondBatteryValue = Math.max(...batteryBank.slice(firstBatteryPosition + 1));

        const batteryJoltage = parseInt(`${firstBatteryValue}${secondBatteryValue}`)
        joltageOutput += batteryJoltage;
    }

    return joltageOutput;
}

const solutionOne = puzzleSolverPartOne(puzzleLines);

console.log("Solution part one: " + solutionOne)