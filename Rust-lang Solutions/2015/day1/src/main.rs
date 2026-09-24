use std::fs;

fn main() {
    println!("2015, Day 1\n");

    let puzzle_input = fs::read_to_string("puzzle.txt")
        .expect("Should read puzzle file");

    println!("{puzzle_input}");
}
