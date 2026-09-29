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

/*
 * Helper function part 2
 * Confirm is string contains the same occurence of two letters in a row at least twice without overlapping
 * E.g: 'xyxy' ('xy') or 'aabcdefgaa' ('aa')
 */
fn contains_repeating_letter_pattern(input: &str) -> bool {
    let chars: Vec<char> = input.chars().collect();

    for i in 0..chars.len()-1 {
        let pattern = (chars[i], chars[i+1]);
        for x in (i+2)..chars.len()-1 {
            if pattern.0 == chars[x] && pattern.1 == chars[x+1] {
                return true;
            }
        }
    }
    false
}

/*
 * Helper function part 2
 * Confirm if string contains at least one occurrence of a letter that repeats with exactly on letter seperating them
 */
fn contains_reapting_letter_seperated(input: &str) -> bool {
    let chars: Vec<char> = input.chars().collect();

    for i in 0..chars.len()-2 {
        if chars[i] == chars[i+2] {
            return true;
        }
    }

    false
}

fn main() {
    println!("Advent of Code 2015, Day 5\n");

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Read puzzle input.");


    /*
     * ----------
     * Part 1
     * ----------
     */
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

    /*
     * ----------
     * Part 2
     * ----------
     */
    let mut updated_num_nice_strings = 0;

    for line in puzzle.lines() {
        if contains_repeating_letter_pattern(line) && contains_reapting_letter_seperated(line) {
            updated_num_nice_strings += 1;
        }
        /*
        println!(
            "{} {}",
            contains_repeating_letter_pattern(line),
            contains_reapting_letter_seperated(line)
        );
        */
    }

    println!("{}", updated_num_nice_strings);
    
}
