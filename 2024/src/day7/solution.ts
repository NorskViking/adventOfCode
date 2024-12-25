import * as fs from 'fs';
import * as path from 'path';

// Determine the input file path and read the entire file content as a list of lines.
// Each line either represents a sumTotal, followed by ':' and numbers that if summed equals the sumTotal
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');

/**
 * Take the input data and parse out the targetCalibration value and its set of values
 * 
 * @param calibrationData 
 * @returns 
 */
const parseCalibrations = (calibrationData: string[]): Map<number, number[]> => {
    const mappedCalibrations = new Map<number, number[]>();

    for (const line of calibrationData) {
        const [calibrationKey, calibrationValues] = line.split(':');
        if (!calibrationValues) {
            continue;
        }

        // Convert result-value to integer
        const key = parseInt(calibrationKey.trim(), 10);

        const values = calibrationValues.trim().split(/\s+/).map(val => parseInt(val, 10));

        mappedCalibrations.set(key, values)
    }

    return mappedCalibrations;
}

const parsedData = parseCalibrations(input);

/**
 * Take targetCalibration value, and a set of values, and an array of operators,
 * Test if any given combinations of operators and values equal targetCalibration value
 * 
 * @param targetCalibration 
 * @param values 
 * @param operators 
 * @returns 
 */
const calculateIfValuesGiveSum = (targetCalibration: number, values: number[], operators: Array<'+'|'*'>): boolean => {
    // The set of possible results after processing i-th number
    let currentResults = new Set<number>([values[0]]);

    // Iterate from the 2nd number onwards
    for (let i = 1; i < values.length; i++) {
        const nextNumber = values[i];
        const newResults = new Set<number>();

        // For each result so far, try all operators with the next number
        for (const result of currentResults) {
            for (const operator of operators) {
                let newValue: number | null = null;
                switch (operator) {
                    case '+' :
                        newValue = result + nextNumber;
                        break;
                    case '*':
                        newValue = result * nextNumber;
                        break;
                }
                if (newValue !== null) {
                    newResults.add(newValue);
                }
            }
        }
        // Move to the next step
        currentResults = newResults;
    }

    return currentResults.has(targetCalibration);;
}

/**
 * Get the calibration total from the set of calibrations
 * 
 * @param calibrationData 
 * @returns 
 */
const getSumOfValidCalibrations = (calibrationData: Map<number, number[]>): number => {
    let totalCalibrationResult: number = 0;
    // For all given sets of calibrations, check if the values are valid
    // Add the calibration-value to the total
    for (const [calibrationValue, numbers] of parsedData.entries()) {
        if(calculateIfValuesGiveSum(calibrationValue, numbers, ['+', '*'])) {
            totalCalibrationResult += calibrationValue;
        }
    }
    return totalCalibrationResult;
}

const calibrationResult = getSumOfValidCalibrations(parsedData);
console.log("Solution part 1: " + calibrationResult);