import { createFileReader } from "@utils/helpers";

// Read input files
const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('test_input.txt');
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

const solutionPartOne = puzzleSolverPartOne(puzzleLines);
console.log("Solution part one: " + solutionPartOne)

// Find valid batteries helper function
function findValidBatteries(batteries: number[], findNumBatteries = 12): string {
    const numBatteries = batteries.length;
    if (findNumBatteries <= 0) return "";
    if (numBatteries <= findNumBatteries) return batteries.join("");

    let start = 0;
    let result = "";

    for (let batteriesLeft = findNumBatteries; batteriesLeft > 0; batteriesLeft--) {
        // 
        const endOfBatteryBank = numBatteries - batteriesLeft;

        // Find the highest value in [start...endOfBatteryBank]
        let batteriPosition = start;
        let batteriValue = batteries[start]!;

        for (let i = start; i <= endOfBatteryBank; i++) {
            const value = batteries[i]!;
            if (value > batteriValue) {
                batteriValue = value;
                batteriPosition = i;
                if (batteriValue === 9) break; // No higher value then 9, go to next value
            }
        }

        result += String(batteriValue);
        start = batteriPosition + 1; // Next battery starting position
    }

    return result;
}

function puzzleSolverPartTwo(lines: string[]): bigint {
    const numberOfBatteriesToFind = 12
    let joltageOutput = 0n;

    for (const line of lines) {
        const batteryBank = puzzleNumbers(line) ?? [0];
        const batteryJoltage = findValidBatteries(batteryBank, numberOfBatteriesToFind);
        joltageOutput += BigInt(batteryJoltage || "0");
    }

    return joltageOutput;
}

const solutionPartTwo = puzzleSolverPartTwo(puzzleLines);
console.log(solutionPartTwo);