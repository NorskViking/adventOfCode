use std::fs;
use regex::Regex;
use std::fmt::Debug;
//use std::cmp;

#[derive(Debug, Clone)]
struct GiftBox {
    length: i32,
    width: i32,
    height: i32,
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

// Helper function for part 2, find the two shortest sides of a given giftbox
fn get_short_sides(a: i32, b: i32, c: i32) -> (i32, i32) {
    // Sort the sides into a tuple of (min, middle, max)
    let (x, y, _z) = if a <= b {
        if b <= c { (a, b, c) }
        else if a <= c { (a, c, b) }
        else { (c, a, b) }
    } else {
        if a <= c { (b, a, c) }
        else if b <= c { (b, c, a) }
        else { (c, b, a) }
    };

    (x, y)
}

/*
 * Calculate the total lenght of ribbon needed, to wrap the present with
 * The needed lenght for a given gift, is the shortes distance around + extra lenght for the bow, equaling the cubic volume of the gift
 * Example: A gift with the dimension `2x3x4` needs `2+2+3+3 = 10` + `2*3*4 = 24` = `34` total length of ribbon 
 */
fn calc_ribbon (giftbox: &GiftBox) -> i32 {
    let side_a = giftbox.length;
    let side_b = giftbox.width;
    let side_c = giftbox.height;

    let short_distance = get_short_sides(side_a, side_b, side_c);

    let dis_around = 2*short_distance.0 + 2*short_distance.1;
    let bow = side_a * side_b * side_c;

    dis_around + bow
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

    let mut total_ribbon = 0;
    
    // Parse the puzzle input, using the regex function
    let box_pile = parse_packages(&puzzle);

    /*
     * Iterate over all the gifts in the pile
     * Calculate the total square feet of wrapping needed for all the gifts
     * Calculate the total length of ribbon needed for all the gifts
     */
    for gift in box_pile {
        total_wrapping += calc_wrapping(&gift);
        total_ribbon += calc_ribbon(&gift);
    }

    println!("{total_wrapping}");
    println!("{total_ribbon}");
}
