import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => Number(entry.trim()));

    let prev: number | undefined = undefined;
    let count = 0;

    for (const entry of entries) {
        if (prev && prev < entry) {
            count++;
        }
        prev = entry;
    }

    return count;
};

run().then((result) => console.log(`Result: ${result}`));
