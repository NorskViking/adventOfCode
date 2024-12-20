import * as fs from 'fs';
import * as path from 'path';

// Determine the input file path and read the entire file content as a list of lines.
// Each line either represents a rule or part of an update report
const inputPath = path.resolve(__dirname, 'input.txt');
const input = fs.readFileSync(inputPath, 'utf8').trim().split('\n');

const rules: [number, number][] = [];
const updates: number[][] = [];

// The input consist of two sections separated by an empty line:
// 1. A set of rules (X|Y) indicating which page must come before the another.
// 2. A set of "update" lists, each a sequence of pages.
//
// First, find the empty line that separates the rules from the updates.
const reportSeparator = input.findIndex(line => line.trim() === '');

// Parse the rules section (everything before the empty line).
// Each rule is in the format "X|Y" meaning page X must come before page Y.
for (let i = 0; i < reportSeparator; i++) {
    const [valueOne, valueTwo] = input[i].split('|');
    const num1 = parseInt(valueOne);
    const num2 = parseInt(valueTwo);
    rules.push([num1, num2]);
}

// Parse the updates section (everything after the empty line).
// Each update line is a comma-separated list of pages.
for (let y = reportSeparator + 1; y < input.length; y++) {
    const line = input[y];
    if (line) {
        // Convert each string into a number
        const pages = line.split(',').map(page => parseInt(page.trim(), 10));
        updates.push(pages);
    }
}

/**
 * Checks if a given update (a sequence of pages) is valid based on the provided rules.
 * A rule [X, Y] mean page X must appear before page Y in the update.
 * 
 * This function verifies that for every rule, the order of the pages in 'update' respects the rule:
 * If both X and Y are present, X must be located at a lower index than Y.
*/
const isValidUpdate = (rules: [number, number][], update: number[]): boolean => {
    for (const rule of rules) {
        for (let i = 0; i < update.length; i++) {
            // Use indexOf to see if "page" X comes after "page" Y in the update.
            // && confirm that the pages in rules are in the update
            if (update.indexOf(rule[0]) >= update.indexOf(rule[1]) && update.indexOf(rule[0]) !== -1 && update.indexOf(rule[1]) !== -1) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Part 1:
 * For all updates that are valid, find the middle page in the sequence and sum up the middle pages.
 * @param rules 
 * @param updates 
 * @returns
 */
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

/**
 * Performs a topological sort on a given set of nodes and directed edges.
 * The directed edges represent ordering constraints: for each edge (from -> to), ,'from' must come before 'to'.
 * 
 * If valid ordering exists, this function returns an array of nodes in a valid topological order.
 * @param nodes 
 * @param directedEdges 
 * @returns
 */
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
    // Repeatedly remove nodes with no incoming edges, append them to the result,
    // and reduce the incoming edges of their neighbors accordingly.
    while (nodesWithNoIncomingEdges.length > 0) {
        const current = nodesWithNoIncomingEdges.shift()!;
        topologicallySortedPages.push(current);

        // Decrement the incoming edge count for each neighbor.
        // If a neighbor now have zero incoming edges, add it to the queue.
        for (const neighbor of adjacencyList.get(current)!) {
            incomingEdgeCount.set(neighbor, incomingEdgeCount.get(neighbor)! -1);
            if (incomingEdgeCount.get(neighbor)! === 0) {
                nodesWithNoIncomingEdges.push(neighbor)
            }
        }
    }

    return topologicallySortedPages;
}

/**
 * Reorders a given update so it respects the rules.
 * Extract the subset of rules that apply to the pages in this update, then use topological sort
 * to generate a valid ordering of the pages.
 */
const reorderUpdateAccordingToRules = (rules: [number, number][], update: number[]): number[] => {
    // Identify applicable rules for a given update
    const pagesInUpdate = new Set(update);
    
    // Filter only rules relevant to these pages
    const applicableRules = rules.filter(([ruleX, ruleY]) => pagesInUpdate.has(ruleX) && pagesInUpdate.has(ruleY));
    
    // Perform a topological sort to find a valid order given the applicable rules.
    const topologicalOrder = performTopologicalSort(update, applicableRules);
    return topologicalOrder;
}

/**
 * Part 2:
 * For updates that are not valid according to the rules, correct their order by reordering the pages.
 * After reordering, find the middle page and sum these middle pages up.
 * @param rules 
 * @param updates 
 * @returns
 */
const solvePartTwo = (rules: [number, number][], updates: number[][]): number => {
    let middlePageSumOfCorrectedReports: number = 0;

    for (const update of updates) {
        // Only process updates that are invalid
        if (!isValidUpdate(rules, update)) {
            const middleIndex = Math.floor(update.length / 2);
            // Reorder the update so it follows the rules, then sum the middle page
            const corrected = reorderUpdateAccordingToRules(rules, update);
            middlePageSumOfCorrectedReports += corrected[middleIndex];
        };
    }

    return middlePageSumOfCorrectedReports;
}

console.log("Solution part 1: " + solvePartOne(rules, updates));
console.log("Solution part 2: " + solvePartTwo(rules, updates));