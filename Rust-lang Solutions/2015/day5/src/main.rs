use std::fs;

/*
 * Helper function part 1
 * Confirm if string contains at least three vowels
 */
fn three_or_more_vowels(input: &str) -> bool {
    let mut num_vowels = 0;

    for letter in input.chars() {
        if letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u' {
            num_vowels += 1;
        } 
    };

    if num_vowels >= 3 {
        return true
    };

    false

}

/*
 * Helper function part 1
 * Confirm if the string contains at least one occurence of double letters
 * e.g: 'aa', 'bb', 'cc' etc.
 */
fn contains_double_letter(input: &str) -> bool {
    let chars: Vec<char> = input.chars().collect();

    for i in 0..chars.len()-1 {
        if chars[i] == chars[i+1] {
            return true;
        }
    }

    false
}

/*
 * Helper function part 1
 * Confirm that line does not contain disallowed strings: 'ab', 'cd' 'pq' or 'xy'
 */
fn no_disallowed_strings(input: &str) -> bool {
    let chars: Vec<char> = input.chars().collect();

    for i in 0..chars.len()-1 {
        if chars[i] == 'a' && chars[i+1] == 'b' {
            return false;
        } else if chars[i] == 'c' && chars[i+1] == 'd' {
            return false;
        } else if chars[i] == 'p' && chars[i+1] == 'q' {
            return false;
        } else if chars[i] == 'x' && chars[i+1] == 'y' {
            return false;
        }
    }
    true
}

fn main() {
    println!("Advent of Code 2015, Day 5\n");

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Read puzzle input.");

    let mut num_nice_strings = 0;

    for line in puzzle.lines() {
        if three_or_more_vowels(line) && contains_double_letter(line) && no_disallowed_strings(line) {
            num_nice_strings += 1;
        }
        /*
        println!(
            "{} {} {}",
            three_or_more_vowels(line),
            contains_double_letter(line),
            no_disallowed_strings(line)
        );
        */
    }

    println!("{}", num_nice_strings);
}
