import * as fs from 'fs';
import * as path from 'path';

// Determine the input file path and read the entire file content as a list of lines.
// Each line either represents a line of the warehouse map.
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');

// Create a 'map' containing information of obstacles and the guard.
const map: string[][] = input.map(line => {
    return line.trim().split('').map(char => String(char));
})

/**
 * Find the guards starting location.
 * If guard is not found, return [-1,-1] to indicate no guard found.
 * @param map 
 * @returns 
 */
const locateGuard = (map: string[][]): [number, number] => {
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const row = map[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            if (row[columnIndex] === '^') {
                return [rowIndex, columnIndex];
            }
        }
    }
    // If no "Guard" found, return [-1, -1]
    return [-1, -1];
}

// A helper function that determines which direction the guard is walking.
// If Guard meets an obstacle, he will turn 90 degrees clockwise and continue walking,
// until he meets a new obstacle or leaves the map.
const direction = {
    up: [-1, 0],
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
}
const directionsInClockwiseOrder = ["up", "right", "down", "left"] as const;
type DirectionName = keyof typeof direction;

/**
 * 
 * @param currentDirection 
 * @returns 
 */
function turnClockwise(currentDirection: DirectionName): DirectionName {
    const currentIndex = directionsInClockwiseOrder.indexOf(currentDirection);
    const nextIndex = (currentIndex + 1) % directionsInClockwiseOrder.length;
    return directionsInClockwiseOrder[nextIndex];
}

/**
 * Using the map and the guards starting position, to map out the guards route.
 * @param map 
 * @param startingLocation 
 * @returns 
 */
const determineGuardPath = (map: string[][], startingLocation: number[]) => {
    // An array for recording the guards path
    let visitedPath: [number, number][] = [];

    // Setting the starting direction to 'up'
    let currentDirection: DirectionName = "up";

    // Current coordinates
    let x = startingLocation[0];
    let y = startingLocation[1];

    // While guard is within the map:
    while(true) {
        // Record guard-path
        visitedPath.push([x,y]);
        const [directionX, directionY] = direction[currentDirection];
        const nextX = x + directionX;
        const nextY = y + directionY;
        
        // If out of bounds, stop
        if (nextX < 0 || nextX >= map.length || nextY < 0 || nextY >= map[0].length) {
            break;
        }

        // Check if there is an obstruction in the guards path
        if (map[nextX][nextY] === "#") {
            // If obstruction, turnClockwise
            currentDirection = turnClockwise(currentDirection);
        } else {
            // Set new location
            x = nextX;
            y = nextY;
        }

    }
    return visitedPath;
}

let guardPath = determineGuardPath(map, locateGuard(map));

/**
 * Return an array of all unique 'map' locations visited by the guard.
 * @param visitedPath 
 * @returns 
 */
function getUniqueCoordinates(visitedPath: Array<[number, number]>): Array<[number, number]> {
    const seen = new Set<string>();
    const uniquePath: Array<[number, number]> = [];

    for (const [row, col] of visitedPath) {
        const key = `${row},${col}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniquePath.push([row, col]);
        }
    }

    return uniquePath;
}

// Solution for part 1
let uniquePath = getUniqueCoordinates(guardPath);



console.log(locateGuard(map));
console.log(determineGuardPath(map, locateGuard(map)).length);
console.log(uniquePath.length);