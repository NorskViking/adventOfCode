import { fail } from 'assert';
import * as fs from 'fs';
import { validateHeaderName } from 'http';
import * as path from 'path';

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();
const lines = input.split('\n');

const reports: number[][] = lines.map(line => {
    return line.trim().split(' ').map(value => Number(value));
});

//Check if report is valid
const isValid = (report: number[]):boolean => {
    const isIncreasing:boolean = report[1] > report[0];
    for (let i = 0; i < report.length - 1; i++) {
        const difference = report[i + 1] - report[i];
        if (isIncreasing) {
            // Return false if is increasing but outside of difference tollerance
            if (difference < 1 || difference > 3) {
                return false;
            }
        } else {
            // Return false if decreasing and outside of difference tollerance
            if (difference > -1 || difference < -3) {
                return false;
            }
        }
    }
    return true;
}

const isSafe = (report: number[], failTollerance: number = 1): boolean => {
    
    if (isValid(report)) {
        return true
    }
    
    if (failTollerance === 0) {
        return isValid(report);
    };

    for (let i = 0; i < report.length; i++) {
        const modifiedReport = [...report];
        modifiedReport.splice(i, 1); // Remove one element at index i
        if (isSafe(modifiedReport, failTollerance - 1)) {
            return true;
        }
    }


    return false;
}

const solvePartOne = (reports: number[][]) => {
    let safeReports: number = 0;
    for (const report of reports) {
        if (isValid(report)) {
            safeReports += 1;
        }
    }
    return safeReports;
}

const solvePartTwo = (reports: number[][]): number => {
    let safeReports = 0;
    for (const report of reports) {
        if (isSafe(report)) {
            safeReports += 1;
        }
    }

    return safeReports;
}

console.log("Number of safe reports: " + solvePartOne(reports));
console.log("Number of safe reports (with dampeners): " + solvePartTwo(reports));