import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

export const countFish = (input: string, days: number) => {
    const entries = input.trim().split(',').map(Number);

    let day = 0;
    let counts: Record<string, number> = {};
    for (const entry of entries) {
        counts[entry] = !counts[entry] ? 1 : counts[entry] + 1;
    }

    while (day < days) {
        const temp: Record<string, number> = {};
        for (const key of Object.keys(counts)) {
            if (key === '0') {
                temp['8'] = !temp['8'] ? counts[key] : temp['8'] + counts[key];
                temp['6'] = !temp['6'] ? counts[key] : temp['6'] + counts[key];
            } else {
                const tempKey = Number(key) - 1;
                temp[tempKey] = !temp[tempKey] ? counts[key] : temp[tempKey] + counts[key];
            }
        }
        counts = temp;
        day++;
    }

    return Object.keys(counts).reduce((total, key) => total + counts[key], 0);
};

console.log('Part 1: ', countFish(input, 80));
console.log('Part 2: ', countFish(input, 256));
