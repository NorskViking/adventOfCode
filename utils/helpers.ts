import * as fs from 'fs';
import * as path from 'path';

export function readInput(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8').trim();
}

export function readLines(filePath: string): string[] {
    return readInput(filePath).split('\n');
}
