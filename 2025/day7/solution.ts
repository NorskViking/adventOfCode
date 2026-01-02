import { createFileReader } from "@utils/helpers";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('test_input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

for (let i = 0; i < puzzleLines.length; i++) {
    console.log(puzzleLines[i])
}

const beamStartingPoint = puzzleLines.findIndex(line => line.trim().split('') === 'S');
console.log(beamStartingPoint);