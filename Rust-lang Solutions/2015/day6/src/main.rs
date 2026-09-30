use std::fs;
use regex::Regex;
use std::fmt::Debug;

#[derive(Debug, Clone)]
struct Light {
    turned_on: bool
}

impl Light {
    fn turn_on(&mut self) -> bool {
        self.turned_on = true;
        self.turned_on
    }

    fn turn_off(&mut self) -> bool {
        self.turned_on = false;
        self.turned_on
    }

    fn toggle(&mut self) -> bool {
        self.turned_on = !self.turned_on;
        self.turned_on
    }
}

#[derive(Debug, Clone)]
struct Instructions {
    command: String,
    x_from: i32,
    y_from: i32,
    x_too: i32,
    y_too: i32,
}

// Parse puzzle input and get the instructions
fn parse_input(input: &str) -> Vec<Instructions> {
    let reg = Regex::new(r"(?<command>turn off|toggle|turn on)\s(?<x_from>\d+),(?<y_from>\d+) through (?<x_too>\d+),(?<y_too>\d+)").unwrap();

    reg.captures_iter(input)
        .map(|caps| Instructions {
            command: caps["command"].to_string(),
            x_from: caps["x_from"].parse::<i32>().unwrap(),
            y_from: caps["y_from"].parse::<i32>().unwrap(),
            x_too: caps["x_too"].parse::<i32>().unwrap(),
            y_too: caps["y_too"].parse::<i32>().unwrap(),
        })
        .collect()
}

/*
*/
fn fix_lights(lights: Vec<Vec<Light>>, _command: &str, x_f: i32, y_f: i32, x_t: i32, y_t: i32) -> Vec<Vec<Light>> {
    
    for x in x_f..x_t {
        for y in y_f..y_t {
            println!("{} {}", x, y);
        }
    }

    lights
}


fn main() {
    println!("Advent of Code 2015, Day 6\n");

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Read puzzle input.");

    // Initiate the grid
    let mut light_grid: Vec<Vec<Light>> = vec![vec![Light { turned_on: false }; 1000]; 1000]; 

    let instructions = parse_input(&puzzle);

    println!(
        "command {:?} from-x: {} from-y: {} too-x: {} too-y: {}",
        instructions[0].command,
        instructions[0].x_from,
        instructions[0].y_from,
        instructions[0].x_too,
        instructions[0].y_too
    );

    light_grid => fix_lights(light_grid, instructions[0].command, instructions[0].x_from, instructions[0].y_from, instructions[0].x_too, instructions[0].y_too);

    
}
