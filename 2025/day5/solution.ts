import { createFileReader } from "@utils/helpers";
import { read } from "fs";
import { isNumberObject } from "util/types";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

// Sort into IDs and ranges
const idRanges: [number, number][] = [];
const ingredientIDs: number[] = [];

const rangeAndIdSeperatorIndex = puzzleLines.findIndex(line => line.trim() === '');

/**
 * Find all ID ranges for fresh ingredient
 */
for (let i = 0; i < rangeAndIdSeperatorIndex; i++) {
    const [lowerRange, upperRange] = puzzleLines[i]!.split('-');
    const lowerValue = parseInt(lowerRange, 10);
    const upperValue = parseInt(upperRange, 10);

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
function idInRange(lowerRange: number, upperRange: number, id: number): boolean {
    if (id >= lowerRange && id <= upperRange) {
        //console.log(id);
        return true;
    };
    
    return false;
}

/**
 * 
 * @param ids 
 * @param ranges 
 * @returns 
 */
function checkAllIngredients(ids: number[], ranges: number[][]): number {
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

