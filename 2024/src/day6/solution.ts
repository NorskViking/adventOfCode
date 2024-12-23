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

// Find the guards starting location in the warehouse
const locateGuard = (map: string[][]): number[] => {
    for (const line of map) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '^') {
                return [map.indexOf(line), line.indexOf(line[i])]
            }
        }
    }
    return [0]
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

// Using the guard starting position, map out his walking path
const determineGuardPath = (map: string[][], startingLocation: number[]) => {
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            
        }
    }
}

console.log("Guard location: " + locateGuard(map))