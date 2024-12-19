import * as fs from 'fs';
import * as path from 'path';

// Read input file
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');

const rules: [number, number][] = [];
const updates: number[][] = [];

const reportSeparator = input.findIndex(line => line.trim() === '');

// Fill in rule-set
for (let i = 0; i < reportSeparator; i++) {
    const [valueOne, valueTwo] = input[i].split('|');
    const num1 = parseInt(valueOne);
    const num2 = parseInt(valueTwo);
    rules.push([num1, num2]);
}

// Fill in updates-array
for (let y = reportSeparator + 1; y < input.length; y++) {
    const line = input[y];
    if (line) {
        const pages = line.split(',').map(page => parseInt(page.trim(), 10));
        updates.push(pages);
    }
}

// Validate that a given report follow the rules
const isValidUpdate = (rules: [number, number][], update: number[]): boolean => {
    for (const rule of rules) {
        for (let i = 0; i < update.length; i++) {
            if (update.indexOf(rule[0]) >= update.indexOf(rule[1]) && update.indexOf(rule[0]) !== -1 && update.indexOf(rule[1]) !== -1) {
                return false;
            }
        }
    }

    return true;
}

const solvePartOne = (rules: [number, number][], updates: number[][]): number => {
    let middlePageSum: number = 0;
    
    for (const update of updates) {
        if (isValidUpdate(rules, update)) {
            const middleIndex = Math.floor(update.length / 2);
            middlePageSum += update[middleIndex];
        };
    }
    return middlePageSum;
}

const performTopologicalSort = (nodes: number[], directedEdges: [number, number][]) : number[] => {
    const adjacencyList = new Map<number, number[]>();
    const incomingEdgeCount = new Map<number, number>();

    // Initialize adjacency list and incoming edge counts
    for (const node of nodes) {
        adjacencyList.set(node, []);
        incomingEdgeCount.set(node, 0);
    }

    // Build the graph from directed edges
    for (const [from, to] of directedEdges) {
        if (adjacencyList.has(from) && adjacencyList.has(to)) {
            adjacencyList.get(from)!.push(to);
            incomingEdgeCount.set(to, (incomingEdgeCount.get(to) || 0) + 1);
        }
    }

    // Initialize a queue for nodes with no incoming edges
    const nodesWithNoIncomingEdges: number[] = [];
    for (const [node, count] of incomingEdgeCount) {
        if (count === 0) {
            nodesWithNoIncomingEdges.push(node)
        }
    }

    const topologicallySortedPages: number[] = [];
    while (nodesWithNoIncomingEdges.length > 0) {
        const current = nodesWithNoIncomingEdges.shift()!;
        topologicallySortedPages.push(current);

        for (const neighbor of adjacencyList.get(current)!) {
            incomingEdgeCount.set(neighbor, incomingEdgeCount.get(neighbor)! -1);
            if (incomingEdgeCount.get(neighbor)! === 0) {
                nodesWithNoIncomingEdges.push(neighbor)
            }
        }
    }

    return topologicallySortedPages;
}

const reorderUpdateAccordingToRules = (rules: [number, number][], update: number[]): number[] => {
    // Identify applicable rules for a given update
    const pagesInUpdate = new Set(update);
    const applicableRules = rules.filter(([ruleA, ruleB]) => pagesInUpdate.has(ruleA) && pagesInUpdate.has(ruleB));

    const topologicalOrder = performTopologicalSort(update, applicableRules);
    return topologicalOrder;
}

const solvePartTwo = (rules: [number, number][], updates: number[][]): number => {
    let middlePageSumOfCorrectedReports: number = 0;

    for (const update of updates) {
        //console.log(update)
        if (!isValidUpdate(rules, update)) {
            const middleIndex = Math.floor(update.length / 2);
            const corrected = reorderUpdateAccordingToRules(rules, update);
            middlePageSumOfCorrectedReports += corrected[middleIndex];
        };
    }

    return middlePageSumOfCorrectedReports;
}

console.log("Solution part 1: " + solvePartOne(rules, updates));
console.log("Solution part 2: " + solvePartTwo(rules, updates));