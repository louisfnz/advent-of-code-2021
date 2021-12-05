import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => entry.trim());

    let countZeroes = new Array(entries[0].length).fill(0);

    for (const entry of entries) {
        for (let i = 0; i < entry.length; i++) {
            if (entry[i] === '0') {
                countZeroes[i]++;
            }
        }
    }

    let gamma = '';
    let epsilon = '';

    for (const count of countZeroes) {
        if (count > Math.floor(entries.length / 2)) {
            gamma += '0';
            epsilon += '1';
        } else {
            gamma += '1';
            epsilon += '0';
        }
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

run().then((result) => console.log(`Result: ${result}`));
