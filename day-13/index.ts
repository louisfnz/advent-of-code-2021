import {readFileSync} from 'fs';
import {runInNewContext} from 'vm';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getEntries = (input: string): [number[][], string[]] => {
    const parts = input.trim().split('\n\n');
    return [parts[0].split('\n').map((item) => item.split(',').map(Number)), parts[1].split('\n')];
};

const doFold = (coords: number[][], fold: string) => {
    const [foldAxis, foldCoord] = fold
        .replace('fold along ', '')
        .trim()
        .split('=')
        .map((item, i) => {
            return i === 0 ? item : Number(item);
        }) as [string, number];

    const [remainingCoords, coordsToFold] = coords.reduce(
        (acc, cur) => {
            if (cur[foldAxis === 'x' ? 0 : 1] > foldCoord) {
                acc[1].push(cur);
            } else {
                acc[0].push(cur);
            }
            return acc;
        },
        [[], []] as number[][][],
    );

    const coordsToAdd = [];
    for (let i = 0; i < coordsToFold.length; i++) {
        const newPos = foldCoord - (coordsToFold[i][foldAxis === 'x' ? 0 : 1] - foldCoord);
        if (newPos >= 0) {
            if (foldAxis === 'x') {
                coordsToAdd.push([newPos, coordsToFold[i][1]]);
            } else {
                coordsToAdd.push([coordsToFold[i][0], newPos]);
            }
        }
    }

    for (const coord of coordsToAdd) {
        if (!remainingCoords.find((c) => c[0] === coord[0] && c[1] === coord[1])) {
            remainingCoords.push(coord);
        }
    }

    return remainingCoords;
};

export const part1 = (input: string) => {
    const [coords, folds] = getEntries(input);
    const remainingCoords = doFold(coords, folds[0]);
    return remainingCoords.length;
};

export const part2 = (input: string) => {
    let [coords, folds] = getEntries(input);

    for (const fold of folds) {
        coords = doFold(coords, fold);
    }

    let code = '';

    for (let y = 0; y <= Math.max(...coords.map((coord) => coord[1])); y++) {
        for (let x = 0; x <= Math.max(...coords.map((coord) => coord[0])); x++) {
            if (coords.find((coord) => coord[0] === x && coord[1] === y)) {
                code += '#';
            } else {
                code += ' ';
            }
        }
        code += '\n';
    }

    return '\n\n' + code;
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
