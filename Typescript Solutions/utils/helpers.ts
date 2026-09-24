import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export function createFileReader(importMetaUrl: string) {
    const baseDir = path.dirname(fileURLToPath(importMetaUrl));

    return {
        readInput(filePath: string): string {
            const fullPath = path.join(baseDir, filePath);
            return fs.readFileSync(fullPath, 'utf8').trim();
        },
        
        readLines(content: string): string[] {
            return content.split('\n');
        }
    }
}

export function readInput(filePath: string): string {
    return fs.readFileSync(filePath, 'utf8').trim();
}

export function readLines(content: string): string[] {
    return content.split('\n');
}
