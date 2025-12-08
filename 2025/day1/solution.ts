import { createFileReader } from "../../utils/helpers"

// Read input files
const reader = createFileReader(__dirname)
const puzzle_data: string = reader.readInput('input.txt');
const puzzle_lines: string[] = reader.readLines(puzzle_data);

//const rotation_direction: string[] = [];
//const rotation_number: number[] = [];

type parsed_input = [string, number];

function parse_input_data(line: string): parsed_input {
    return [line[0], parseInt(line.slice(1), 10)];
}


function puzzle_solver_part1(lines: string[]): number {
    let occurrences_of_zero: number = 0;
    let position = 50;
    const WHEEL_SIZE = 100;

    for (const line of lines) {
        const [direction, amount] = parse_input_data(line);

        if (direction === 'L') {
            position -= amount;
        } else if (direction === 'R') {
            position += amount;
        }

        position = ((position % WHEEL_SIZE) + WHEEL_SIZE) % WHEEL_SIZE;
        
        if (position === 0) {
            occurrences_of_zero++;
        }

    }
    return occurrences_of_zero;
}

const solution: number = puzzle_solver_part1(puzzle_lines);
console.log(solution);

function puzzle_solver_part_two(lines: string[]): number {
    let occurrences_of_zero: number = 0;
    let position = 50;
    const WHEEL_SIZE = 100;

    for (const line of lines) {
        const [direction, amount] = parse_input_data(line);
        const startPosition = position;

        if (direction === 'L') {
            position -= amount;
        } else if (direction === 'R') {
            position += amount;
        }

        const rotations = Math.floor(Math.abs(position - startPosition) / WHEEL_SIZE);
        occurrences_of_zero += rotations;

        const wrappedStart = ((startPosition % 100) + 100) % 100;
        const wrappedNew = ((position % 100) + 100) % 100;

        if (wrappedStart !== 0) {
            if (direction === 'L') {
                if (rotations === 0 && wrappedStart > wrappedNew) {
                    occurrences_of_zero++;
                } else if (rotations > 0 && wrappedStart != wrappedNew) {
                    occurrences_of_zero++;
                }
            } else if (direction === 'R') {
                if (rotations === 0 && wrappedNew < wrappedStart) {
                    occurrences_of_zero++;
                } else if (rotations > 0 && wrappedStart !== wrappedNew) {
                    occurrences_of_zero++;
                }
            }
        }
        
        position = wrappedNew;
    }
    return occurrences_of_zero;
}

const solution_part_two = puzzle_solver_part_two(puzzle_lines);
console.log(solution_part_two);