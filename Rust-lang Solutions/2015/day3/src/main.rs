use std::fs;
use std::collections::HashSet;
//use std::fmt::Display;

fn deliver_present(heading: char, current_location: (i32, i32)) -> (i32, i32) {
        let mut current_house = current_location;
    
    if heading == '^' {
        // Move one house up in the grid
        current_house.0 += 1;
    } else if heading == 'v' {
        // Move one house down in the grid
        current_house.0 -= 1;
    } else if heading == '<' {
        // Move one house to the left in the grid
        current_house.1 -= 1;
    } else if heading == '>' {
        // Move one house to the right in the grid
        current_house.1 += 1;
    } else {
        println!("Unknown cha: {} ecnountered, ending present delivery!!!", heading);
    }

    current_house

}

fn main() {
    println!("Advent of Code 2015, Day 3");

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Read puzzle input.");


    /*
     * ----------
     * Part 1
     * ---------- 
     */

    // first value = up/down, second value = left/right
    let mut house_location: (i32, i32) = (0, 0);

    let mut house_grid = Vec::new();
    house_grid.push(house_location);

    for direction in puzzle.chars() {
        house_location = deliver_present(direction, house_location);
        house_grid.push(house_location);
    }

    let unique_house_deliveries: HashSet<(i32, i32)> = house_grid.into_iter().collect();
    println!("Number of houses delivered to: {}", unique_house_deliveries.len());

    /*
     * ----------
     * Part 2
     * ----------
     */

    // Reset location for Santa and Robo-santa
    let mut santa_location: (i32, i32) = (0, 0);
    let mut robo_santa_location: (i32, i32) = (0, 0);

    let mut whos_turn: u32 = 1;

    let mut new_house_grid =  Vec::new();
    new_house_grid.push(santa_location);
    new_house_grid.push(robo_santa_location);

    for direction in puzzle.chars() {
        if whos_turn % 2 == 0 {
            robo_santa_location = deliver_present(direction, robo_santa_location);
            new_house_grid.push(robo_santa_location);
        } else {
            santa_location = deliver_present(direction, santa_location);
            new_house_grid.push(santa_location);
        }
        whos_turn += 1;
    }

    let unique_new_house_deliveries: HashSet<(i32, i32)> = new_house_grid.into_iter().collect();
    println!("Number of houses delivered to by Santa and Robo-Santa: {}", unique_new_house_deliveries.len());


}
