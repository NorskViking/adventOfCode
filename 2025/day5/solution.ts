import { createFileReader } from "@utils/helpers";
import { read } from "fs";
import { isNumberObject } from "util/types";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

// Sort into IDs and ranges
type IdRange = [bigint, bigint];

const idRanges: [bigint, bigint][] = [];
const ingredientIDs: number[] = [];

const rangeAndIdSeperatorIndex = puzzleLines.findIndex(line => line.trim() === '');

/**
 * Find all ID ranges for fresh ingredient
 */
for (let i = 0; i < rangeAndIdSeperatorIndex; i++) {
    const [lowerRange, upperRange] = puzzleLines[i]!.split('-');
    const lowerValue = BigInt(lowerRange);
    const upperValue = BigInt(upperRange);

    idRanges.push([lowerValue, upperValue])
}

/**
 * Find all ingredient IDs
 */
for (let y = rangeAndIdSeperatorIndex + 1; y < puzzleLines.length; y++) {
    const id = puzzleLines[y]?.trim();
    if (id) {
        ingredientIDs.push(parseInt(id))
    }
}

/**
 * Helper function, is current ID is in range
 * 
 * @param lowerRange 
 * @param upperRange 
 * @param id 
 * @returns 
 */
function idInRange(lowerRange: bigint, upperRange: bigint, id: number): boolean {
    if (id >= lowerRange && id <= upperRange) {
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
function checkAllIngredients(ids: number[], ranges: bigint[][]): number {
    let numFreshIngredients = 0; 
    
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

// Helper function, remove duplicate number values
// ToDo?: move over to helpers.ts and import?
const removeDuplicates = (array: number[]): number[] => {
    return array.filter((value,
        index) => array.indexOf(value) === index);
    
}

/**
 * Helper function for part two, add all ID values in range to list
 * 
 * @param idList 
 * @param first 
 * @param last 
 * @returns 
 */
function addValidIDsToList(idList: number[], first: number, last: number): number[] {
    let currentIDs = [...idList];
    // We know we are only working with two ID-range numbers
    const firstID = first;
    const lastID = last;  
    
    for (let i = firstID; i < lastID; i++) {
        currentIDs.push(i);
    }

    currentIDs = removeDuplicates(currentIDs);

    return currentIDs;
}


function findAllValidIngredientIDs(allRanges: number[][]): number {
    let validIDs: number[] = [];
    const lengthOfRanges = allRanges.length;

    for (let i = 0; i < lengthOfRanges; i++) {
        validIDs = addValidIDsToList(validIDs, allRanges[i][0], allRanges[i][1]);
    }

    return validIDs.length;
}


// New solution?:


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

    merged.push([currentEnd, currentEnd]);
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
console.log("total: " +totalValidIds);

//const totalValidIngredientIDs = findAllValidIngredientIDs(idRanges);
//console.log("Total number of valid ingredent IDs: " + totalValidIngredientIDs);