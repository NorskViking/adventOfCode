use md5::{Md5, Digest};
//use hex_literal::hex;

/*
 * Part 1 - Find the lowest result with five 0's
 */
fn mine_adventcoins(secret_key: &str) -> u64 {
    let mut n: u64 = 1;
    loop {
        let mut hasher = Md5::new();
        hasher.update(format!("{}{}", secret_key, n).as_bytes());
        let digest = hasher.finalize();

        if digest[0] == 0 && digest[1] == 0 && (digest[2] >> 4) == 0 {
            return n;
        }
        n += 1;
    }
}

/*
 * Part 2 - Find the lowest result with six 0's
 */
fn mine_more_coins(secret_key: &str) -> u64 {
    let mut n: u64 = 1;
    loop {
        let mut hasher = Md5::new();
        hasher.update(format!("{}{}", secret_key, n).as_bytes());
        let digest = hasher.finalize();

        if digest[0] == 0 && digest[1] == 0 && digest[2] == 0 {
            return n;
        }
        n += 1;
    }
}

fn main() {
    println!("Advent of Code 2015, Day 4");

    let puzzle = "iwrupvqb";

    let coins = mine_adventcoins(puzzle);
    println!("Coin hashes: {}", coins);

    let more_coins = mine_more_coins(puzzle);
    println!("More coins: {}", more_coins);
}
