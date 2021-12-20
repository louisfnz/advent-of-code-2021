import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getGrid = (input: string): number[][] =>
    input
        .trim()
        .split('\n')
        .map((item) => item.split('').map(Number));

const updateGrid = (grid: number[][]) => {
    const flashed = [];
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            grid[r][c]++;
            if (grid[r][c] === 10) {
                grid[r][c] = 0;
                flashed.push([r, c]);
            }
        }
    }
    return flashed;
};

const updateAdjacent = (grid: number[][], point: [number, number]) => {
    const vectors = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
    ];
    let flashes = 1;

    for (const vector of vectors) {
        const [r, c] = [point[0] + vector[0], point[1] + vector[1]];
        if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length && grid[r][c] !== 0) {
            grid[r][c]++;
            if (grid[r][c] === 10) {
                grid[r][c] = 0;
                flashes += updateAdjacent(grid, [r, c]);
            }
        }
    }
    return flashes;
};

export const part1 = (input: string) => {
    const grid = getGrid(input);
    let flashes = 0;

    for (let i = 0; i < 100; i++) {
        const flashPoints = updateGrid(grid);
        for (const [r, c] of flashPoints) {
            flashes += updateAdjacent(grid, [r, c]);
        }
    }

    return flashes;
};

export const part2 = (input: string) => {
    const grid = getGrid(input);
    let allFlashing = false;
    let step = 0;

    while (!allFlashing) {
        step++;
        const flashPoints = updateGrid(grid);

        for (const [r, c] of flashPoints) {
            updateAdjacent(grid, [r, c]);
        }

        allFlashing = grid.every((r) => r.every((c) => c === 0));
    }

    return step;
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
