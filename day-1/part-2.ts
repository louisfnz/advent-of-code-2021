import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => Number(entry.trim()));

    let prev: number | undefined;
    let count = 0;

    for (let i = 2; i < entries.length; i++) {
        const sum = entries[i - 2] + entries[i - 1] + entries[i];
        if (prev && prev < sum) {
            count++;
        }
        prev = sum;
    }

    return count;
};

run().then((result) => console.log(`Result: ${result}`));
