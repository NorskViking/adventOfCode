use std::collections::HashMap;
use std::fs;

enum Expr<'a> {
    Value(&'a str),
    Not(&'a str),
    And(&'a str, &'a str),
    Or(&'a str, &'a str),
    LShift(&'a str, &'a str),
    RShift(&'a str, &'a str),
}

fn parse(input: &str) -> HashMap<&str, Expr<'_>> {
    let mut circuit = HashMap::new();
    for line in input.lines() {
        let (lhs, target) = line.split_once(" -> ").unwrap();
        let parts: Vec<&str> = lhs.split_whitespace().collect();

        let expr = match parts[..] {
            [a]                 => Expr::Value(a),
            ["NOT", a]          => Expr::Not(a),
            [a, "AND", b]       => Expr::And(a, b),
            [a, "OR", b]        => Expr::Or(a, b),
            [a, "LSHIFT", b]    => Expr::LShift(a, b),
            [a, "RSHIFT", b]    => Expr::RShift(a, b),
            _ => panic!("Bad line: {line}"),
        };
        circuit.insert(target, expr);
    }
    circuit
}

//Check if wire have a signal
fn signal(op: &str, wires: &HashMap<&str, u16>) -> Option<u16> {
    match op.parse::<u16>() {
        Ok(n) => Some(n),
        Err(_) => wires.get(op).copied(),
    }
}

fn try_eval(expr: &Expr, wires: &HashMap<&str, u16>) -> Option<u16> {
    let value = match expr {
        Expr::Value(a)      => signal(a, wires)?,
        Expr::Not(a)        => !signal(a, wires)?,
        Expr::And(a, b)     => signal(a, wires)? & signal(b, wires)?,
        Expr::Or(a, b)      => signal(a, wires)? | signal(b, wires)?,
        Expr::LShift(a, b)  => signal(a, wires)? << signal(b, wires)?,
        Expr::RShift(a, b)  => signal(a, wires)? >> signal(b, wires)?,
    };
    Some(value)
}

fn main() {
    println!("Advent of Code 2015, Day 7\n");

/* 
----------
Part 1
----------
*/

    let puzzle = fs::read_to_string("puzzle.txt").unwrap();
    let circuit = parse(&puzzle);

    let mut wires: HashMap<&str, u16> = HashMap::new();

    while wires.len() < circuit.len() {
        let before = wires.len();

        for (&target, expr) in &circuit {
            if wires.contains_key(target) {
                continue;
            }
            if let Some(value) = try_eval(expr, &wires) {
                wires.insert(target, value);
            }
        }

        if wires.len() == before {
            panic!("no progress: some wires can never get a signal");
        }
    }

    
    println!("a = {}", wires["a"]);
/* 
----------
Part 2
----------
*/

}
