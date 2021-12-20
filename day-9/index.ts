import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getHeightMap = (input: string): number[][] =>
    input
        .trim()
        .split('\n')
        .map((line) => {
            return line.split('').map((item) => Number(item));
        });

const findLowPoints = (heightMap: number[][]): [number, number][] => {
    const lowPoints = [];
    for (let r = 0; r < heightMap.length; r++) {
        for (let c = 0; c < heightMap[0].length; c++) {
            // Check up
            if (r - 1 >= 0 && heightMap[r - 1][c] <= heightMap[r][c]) continue;
            // Check right
            if (c + 1 < heightMap[0].length && heightMap[r][c + 1] <= heightMap[r][c]) continue;
            // Check down
            if (r + 1 < heightMap.length && heightMap[r + 1][c] <= heightMap[r][c]) continue;
            // Check left
            if (c - 1 >= 0 && heightMap[r][c - 1] <= heightMap[r][c]) continue;
            // It's a low point yo
            lowPoints.push([r, c]);
        }
    }
    return lowPoints as [number, number][];
};

export const part1 = (input: string) => {
    const heightMap = getHeightMap(input);
    const lowPoints = findLowPoints(heightMap);
    return lowPoints.reduce((acc, [r, c]) => acc + Number(heightMap[r][c]) + 1, 0);
};

export const part2 = (input: string) => {
    const heightMap = getHeightMap(input);
    const lowPoints = findLowPoints(heightMap);
    const basinSizes = [];

    for (const point of lowPoints) {
        const toVisit = [point];
        const visited = new Set();

        while (toVisit.length) {
            const [r, c] = toVisit.shift() as [number, number];
            visited.add(`${r}-${c}`);
            // Add up
            if (r - 1 >= 0 && heightMap[r - 1][c] < 9 && !visited.has(`${r - 1}-${c}`)) {
                toVisit.push([r - 1, c]);
            }
            // Add right
            if (c + 1 < heightMap[0].length && heightMap[r][c + 1] < 9 && !visited.has(`${r}-${c + 1}`)) {
                toVisit.push([r, c + 1]);
            }
            // Add down
            if (r + 1 < heightMap.length && heightMap[r + 1][c] < 9 && !visited.has(`${r + 1}-${c}`)) {
                toVisit.push([r + 1, c]);
            }
            // Add left
            if (c - 1 >= 0 && heightMap[r][c - 1] < 9 && !visited.has(`${r}-${c - 1}`)) {
                toVisit.push([r, c - 1]);
            }
        }

        basinSizes.push(visited.size);
    }

    return basinSizes
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, cur) => acc * cur, 1);
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
