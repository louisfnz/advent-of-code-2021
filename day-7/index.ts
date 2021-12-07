import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

export const calculateFuel = (input: string, part: 1 | 2) => {
    const entries = input.trim().split(',').map(Number);

    const max = Math.max(...entries);
    const min = Math.min(...entries);

    let minFuel = Infinity;

    for (let i = min; i <= max; i++) {
        const fuel = entries.reduce((total, crab) => {
            const steps = Math.abs(crab - i);
            if (part === 1) total += steps;
            if (part === 2) total += (steps / 2) * (1 + steps);
            return total;
        }, 0);

        minFuel = Math.min(minFuel, fuel);
    }

    return minFuel;
};

console.log('Part 1: ', calculateFuel(input, 1));
console.log('Part 2: ', calculateFuel(input, 2));
