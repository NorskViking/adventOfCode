import * as fs from 'fs';
import * as path from 'path';

// Determine the input file path and read the entire file content as a list of lines.
// Each line either represents a sumTotal, followed by ':' and numbers that if summed equals the sumTotal
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');
