use std::fs;

fn main() {
    println!("Advent of Code 2015, Day 7\n");

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Read puzzle input");

    for line in puzzle.lines() {
        println!("{:?}", line);
        for word in line.split_whitespace() {
            println!("{:?}", word)
        };
    };


}
