import { createFileReader } from "@utils/helpers";
import { read } from "fs";

const reader = createFileReader(import.meta.url);
const puzzleData: string = reader.readInput('test_input.txt');
const puzzleLines: string[] = reader.readLines(puzzleData);

console.log(puzzleLines);