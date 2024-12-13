import * as fs from 'fs';
import * as path from 'path';

const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim();
const lines = input.split('\n');