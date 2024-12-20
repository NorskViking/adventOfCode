import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');


