use std::fs;

fn main() {
    println!("Advent of Code 2015, Day 1\n");

    let mut floor: i32 = 0;
    let mut position = 0;

    /* ------------
        Part 1
        -----------
     */

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Should read puzzle file");

    //Starting at floor 0, move one floor up if char is '(' or down if ')'
    for element in puzzle.chars() {
        if element == '(' {
            floor += 1;
        } else if element == ')' {
            floor -= 1;
        } else {
            println!("Something wrong happended with element: {element}\n");
        }
    }

    println!("Santa have arrieved at floor: {floor}\n");

    /* ------------
        Part 2
        -----------
     */
    //Find first occurrence of hitting floor -1, and return the position in the string
    
    floor = 0; //remember to reset floor count

    for element in puzzle.chars() {
        if element == '(' {
            floor += 1;
        } else if element == ')' {
            floor -= 1;
        } else {
            println!("Something wrong happended with element: {element}\n");
            continue;
        }

        position += 1;

        if floor == -1 {
            println!("Found the basement at position {position}");
            break;
        }
    }

}
