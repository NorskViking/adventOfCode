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
    x_from: usize,
    y_from: usize,
    x_too: usize,
    y_too: usize,
}

// Parse puzzle input and get the instructions
fn parse_input(input: &str) -> Vec<Instructions> {
    let reg = Regex::new(r"(?<command>turn off|toggle|turn on)\s(?<x_from>\d+),(?<y_from>\d+) through (?<x_too>\d+),(?<y_too>\d+)").unwrap();

    reg.captures_iter(input)
        .map(|caps| Instructions {
            command: caps["command"].to_string(),
            x_from: caps["x_from"].parse::<usize>().unwrap(),
            y_from: caps["y_from"].parse::<usize>().unwrap(),
            x_too: caps["x_too"].parse::<usize>().unwrap(),
            y_too: caps["y_too"].parse::<usize>().unwrap(),
        })
        .collect()
}

/*
 * 
*/
fn fix_lights(mut lights: Vec<Vec<Light>>, command: &str, x_f: usize, y_f: usize, x_t: usize, y_t: usize) -> Vec<Vec<Light>> {
    
    for row in x_f..x_t+1 {
        for col in y_f..y_t+1 {
            if command == "turn off" {
                lights[row][col].turn_off();
            } else if command == "turn on" {
                lights[row][col].turn_on();
            } else if command == "toggle" {
                lights[row][col].toggle();
            }
        }
    }

    lights
}

fn read_lights(lights: Vec<Vec<Light>>) -> u32 {
    let mut num_lights_turned_on: u32 = 0;

    for row in lights {
        for light in row {
            if light.turned_on {
                num_lights_turned_on += 1;
            }
        }
    }

    num_lights_turned_on
}


fn main() {
    println!("Advent of Code 2015, Day 6\n");

    let puzzle = fs::read_to_string("puzzle.txt")
        .expect("Read puzzle input.");

    // Initiate the grid
    let mut light_grid: Vec<Vec<Light>> = vec![vec![Light { turned_on: false }; 1000]; 1000]; 

    let instructions = parse_input(&puzzle);

    
    for ins in instructions {
        light_grid = fix_lights(light_grid, &ins.command, ins.x_from, ins.y_from, ins.x_too, ins.y_too);
    }

    println!(
        "{:?}",
        read_lights(light_grid),
    );
}
