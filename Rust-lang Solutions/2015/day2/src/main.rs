use std::fs;
use regex::Regex;
use std::fmt::Debug;

#[derive(Debug, Clone)]
struct GiftBox {
    length: i32,
    width: i32,
    height: i32,
}

/*
 * Calculate the total square feet of wrapping needed for a given gift box
 * Adding in slack equal to the area of smallest side 
 */
fn calc_wrapping (giftbox: &GiftBox) -> i32 {
    let side_a = giftbox.length * giftbox.width;
    let side_b = giftbox.length * giftbox.height;
    let side_c = giftbox.width * giftbox.height;
    
    2*(side_a + side_b + side_c) + [side_a, side_b, side_c].iter().min().unwrap()
}

/*
 * Use Regex to parse an map over each line in the input
 * Extracts "length", "width" and "height" values from a given string
 * Populate Vector with the GiftBox struct values read from input
 */
fn parse_packages(input: &str) -> Vec<GiftBox> {
    let reg = Regex::new(r"(?<l>\d+)x(?<w>\d+)x(?<h>\d+)").unwrap();

    reg.captures_iter(input)
        .map(|caps| GiftBox {
                length: caps["l"].parse::<i32>().unwrap(),
                width: caps["w"].parse::<i32>().unwrap(),
                height: caps["h"].parse::<i32>().unwrap(),
        })
        .collect()

}

fn main() {
    println!("Advent of Code 2015, Day 2\n");
    
    let puzzle = fs::read_to_string("puzzle.txt")
    .expect("Failed to read file");

/*  ----------
Part 1
----------
*/

    // Inital known value of total square feet wrapping paper needed
    let mut total_wrapping = 0;
    
    // Parse the puzzle input, using the regex function
    let box_pile = parse_packages(&puzzle);

    for gift in box_pile {
        total_wrapping += calc_wrapping(&gift);
    }

    println!("{total_wrapping}");
}
