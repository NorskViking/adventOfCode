import { createFileReader } from "@utils/helpers";
import { read } from "fs";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('test_input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

console.log(puzzleLines);

const idRanges: [number, number][] = [];
const ingredientIDs: number[] = [];

const rangeAndIdSeperatorIndex = puzzleLines.findIndex(line => line.trim() === '');

/**
 * Find all ID ranges for fresh ingredient
 */
for (let i = 0; i < rangeAndIdSeperatorIndex; i++) {
    const [lowerRange, upperRange] = puzzleLines[i]?.split('-');
    const lowerValue = parseInt(lowerRange);
    const upperValue = parseInt(upperRange);
    idRanges.push([lowerValue, upperValue])
}

/**
 * Find all ingredient IDs
 */
for (let y = rangeAndIdSeperatorIndex; y < puzzleLines.length; y++) {
    const ids = puzzleLines[y];
    if (ids) {
        ingredientIDs.push(parseInt(ids))
    }
}

