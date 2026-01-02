import { createFileReader } from "@utils/helpers";
import { error } from "console";
import { copyFileSync } from "fs";

// Read input files
const reader = createFileReader(import.meta.url)
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

type Operator = "+" | "*";
type Problem = {values: number[]; operator: Operator};

/**
 * Find all values in a given row
 * @param line 
 * @returns 
 */
function parseNumberRow(line: string): number[] {
    return line.trim().split(/\s+/).map(token => parseInt(token, 10));
}

/**
 * Find all operator values in a row
 * @param line 
 * @returns 
 */
function parseOperatorRow(line: string): Operator[] {
    return line.trim().split(/\s+/).map(token => token as Operator);
}

/**
 * Create a tuple, consisting of values and operator belonging the the same column
 * @param lines 
 * @returns 
 */
function buildMathColumns(lines: string[]): Problem[] {
    const numberRows = lines.slice(0, -1).map(parseNumberRow);
    const operators = parseOperatorRow(lines[lines.length - 1]);

    const numberOfColumns = operators.length;

    return Array.from({ length: numberOfColumns}, (_, columnIndex) => ({
        values: numberRows.map(row => row[columnIndex]!),
        operator: operators[columnIndex]
    }));
}

// gather all math problems in a structured tuple
const mathProblems = buildMathColumns(puzzleLines);

/**
 * Solve the array of values, with the given operator
 * @param values 
 * @param operator 
 * @returns 
 */
function solveMathProblem(values: number[], operator: Operator): number {
    let solution = 0;
    let multiplicationValue = 1; // can't multiply with 0

    for (let i = 0; i < values.length; i++) {
        if (operator === '+') {
            solution += values[i] || 0; 
        } else if (operator === '*') {
            multiplicationValue *= values[i] || 1;
            solution = multiplicationValue
        }
    }
    return solution;
}

/**
 * Take a given tuple of values and operators, and return the total of all calculations
 * @param toSolve 
 * @returns 
 */
function solveAndGetTotal(toSolve: Problem[]): number {
    let grandTotal = 0;

    for (let i = 0; i < toSolve.length; i++) {
        grandTotal += solveMathProblem(toSolve[i]!.values, toSolve[i]!.operator);
    }

    return grandTotal;
}

// Solution for part one
const grandTotalOfMathProblems = solveAndGetTotal(mathProblems);
console.log("Grand total: " + grandTotalOfMathProblems);


/**
 * Get char-grid from input
 * @param lines 
 * @returns 
 */
function toCharGrid(lines: string[]): string[][] {
    const width = Math.max(...lines.map(l => l.length));
    return lines.map(line => line.padEnd(width, " ").split(""));
}

/**
 * Check if chars in column are empty spaces or values|operators
 * @param grid 
 * @param colIndex 
 * @returns 
 */
function isAllSpacesInColumn(grid: string[][], colIndex: number): boolean {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        if (grid[rowIndex]![colIndex] !== " ") return false;
    }
    return true;
}

/**
 * Find and group problems that belong with each other
 * @param grid 
 * @returns 
 */
function findProblemColumnGroups(grid: string[][]): Array<{startCol: number; endCol: number}> {
    const totalColumns = grid[0]!.length;
    const groups: Array<{ startCol: number, endCol: number}> = [];

    let col = totalColumns - 1;
    while (col >= 0) {
        while (col >= 0 && isAllSpacesInColumn(grid, col)) col--;
        if (col < 0) break;

        // New column is inside a problem group; extend left until seperator
        const endCol = col;
        while (col >= 0 && !isAllSpacesInColumn(grid, col)) col--;
        const startCol = col + 1;

        groups.push({ startCol, endCol });
    }

    return groups;
}

/**
 * New Operator parsing, as old one would not work for part two
 * @param grid 
 * @param operatorRowIndex 
 * @param startCol 
 * @param endCol 
 * @returns 
 */
function parseOperatorFromGroup(grid: string[][], operatorRowIndex: number, startCol: number, endCol: number): Operator {
    for (let col = startCol; col <= endCol; col++) {
        const ch = grid[operatorRowIndex]![col]!;
        if (ch !== " ") return ch as Operator;
    }
    throw new Error(`No operator found in ${startCol}-${endCol}`)
}

/**
 * From input, find and group values that line up in a column
 * @param grid 
 * @param numberRowCount 
 * @param startCol 
 * @param endCol 
 * @returns 
 */
function parseNumbersFromGroupByColumn(grid: string[][], numberRowCount: number, startCol: number, endCol: number): number[] {
    const values: number[] = [];

    // Each *non-space* column* inside the group is one number-column
    for (let col = startCol; col <= endCol; col++) {
        let hasDigit = false;
        for (let rowIndex = 0; rowIndex < numberRowCount; rowIndex++) {
            if (grid[rowIndex]![col] !== " ") {
                hasDigit = true;
                break;
            }
        }
        if (!hasDigit) continue;

        const digitChars: string[] = [];
        for (let rowIndex = 0; rowIndex < numberRowCount; rowIndex++) {
            const ch = grid[rowIndex]![col]!;
            if (ch !== " ") digitChars.push(ch);
        }

        values.push(parseInt(digitChars.join(""), 10));
    }

    return values;
}

/**
 * Build the correct cepalhopod problems from input data
 * @param lines 
 * @returns 
 */
function buildCephalopodProblems(lines: string[]): Problem[] {
    const cleaned = lines.filter(l => l.length > 0);
    const grid = toCharGrid(cleaned);

    const operatorRowIndex = grid.length - 1;
    const numberRowCount = grid.length - 1;

    const groups = findProblemColumnGroups(grid);

    return groups.map(({ startCol, endCol}) => {
        const operator = parseOperatorFromGroup(grid, operatorRowIndex, startCol, endCol);
        const values = parseNumbersFromGroupByColumn(grid, numberRowCount, startCol, endCol);
        return {values, operator}
    })
}

// Solution part two
const problems = buildCephalopodProblems(puzzleLines);
const cephalopodCorrectTotal = solveAndGetTotal(problems);
console.log("Correct cephalopod total: " + cephalopodCorrectTotal);