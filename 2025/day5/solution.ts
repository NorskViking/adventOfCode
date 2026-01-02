import { createFileReader } from "@utils/helpers";
import { read } from "fs";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

// Sort into IDs and ranges
type IdRange = [bigint, bigint];

const idRanges: [bigint, bigint][] = [];
const ingredientIDs: bigint[] = [];

const rangeAndIdSeperatorIndex = puzzleLines.findIndex(line => line.trim() === '');

/**
 * Find all ID ranges for fresh ingredient
 */
for (let i = 0; i < rangeAndIdSeperatorIndex; i++) {
    const [start, end] = puzzleLines[i]!.split('-');
    const lowerValue = BigInt(start);
    const upperValue = BigInt(end);

    idRanges.push([lowerValue, upperValue])
}

/**
 * Find all ingredient IDs
 */
for (let y = rangeAndIdSeperatorIndex + 1; y < puzzleLines.length; y++) {
    const id = puzzleLines[y]?.trim();
    if (id) {
        ingredientIDs.push(BigInt(id))
    }
}

/**
 * Helper function, is current ID is in range
 * 
 * @param start 
 * @param end 
 * @param id 
 * @returns 
 */
function idInRange(start: bigint, end: bigint, id: bigint): boolean {
    if (id >= start && id <= end) {
        return true;
    };
    
    return false;
}

/**
 * Find all 
 * 
 * @param ids 
 * @param ranges 
 * @returns 
 */
function checkAllIngredients(ids: bigint[], ranges: bigint[][]): bigint {
    let numFreshIngredients = 0n; 
    
    for (let i = 0; i < ids.length; i++) {
        const currentID = ids[i];
        console.log
        for (let y = 0; y < ranges.length; y++) {
            const lower = ranges[y][0];
            const upper = ranges[y][1];
            if (idInRange(lower, upper, currentID)) {
                numFreshIngredients++;
                break;
            }
        }
    }

    return numFreshIngredients;
}

// Result for part one of day 5
const totalFreshIngredients = checkAllIngredients(ingredientIDs, idRanges);
console.log("Number of fresh ingredients: " + totalFreshIngredients);


/**
 * 
 * @param ranges 
 * @returns 
 */
function mergeRanges(ranges: IdRange[]): IdRange[] {
    if (ranges.length === 0) return [];

    const sortedRanges = [...ranges].sort((a, b) => {
        if (a[0] < b[0]) return -1;
        if (a[0] > b[0]) return 1;
        return 0;
    });

    const merged: IdRange[] = [];
    let [currentStart, currentEnd] = sortedRanges[0];

    for (let i = 1; i < sortedRanges.length; i++) {
        const [start, end] = sortedRanges[i];

        if (start <= currentEnd + 1n) {
            if (end > currentEnd) {
                currentEnd = end;
            }
        } else {
            merged.push([currentStart, currentEnd]);
            currentStart = start;
            currentEnd = end;
        }
    }

    merged.push([currentStart, currentEnd]);
    return merged;
}

function countIdsInRanges(ranges: IdRange[]): bigint {
    const merged = mergeRanges(ranges);
    let total = 0n;

    for (const [start, end] of merged) {
        total += (end - start + 1n);
    }

    return total;
}

const totalValidIds = countIdsInRanges(idRanges);
console.log("total: " + totalValidIds);