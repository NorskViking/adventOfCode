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
 * @param batteries 
 * @returns 
 */
function puzzleSolverPartOne(lines: string[]): number {
    let joltageOutput: number = 0;

    for (const line of lines) {
        const batteryBank: number[] = puzzleNumbers(line) || [0];
        let firstBattery = batteryBank[0] || 0;
        let firstBatteryPosition = 0;
        
        // Find largest possible for the first battery, before end of battery bank
        for (let b = 0; b <= batteryBank.length-2; b++) {
            const currentBattery = batteryBank[b] ?? 0;
            if (firstBattery < currentBattery) {
                firstBattery = currentBattery;
                firstBatteryPosition = b;
            }
        }
        let secondBattery = batteryBank[firstBatteryPosition+1] || 0;
        for (let b = firstBatteryPosition+1; b < batteryBank.length; b++) {
            const currentBattery = batteryBank[b] ?? 0;
            if (secondBattery < currentBattery) {
                secondBattery = currentBattery;
            }
        }
        const batteryJoltage: number = parseInt(`${firstBattery}${secondBattery}`);
        joltageOutput += batteryJoltage;
    }

    return joltageOutput;
}

const solutionOne = puzzleSolverPartOne(puzzleLines);

console.log("Solution part one: " + solutionOne)