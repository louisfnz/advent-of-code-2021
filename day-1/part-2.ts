import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => Number(entry.trim()));

    return entries.reduce((count, entry, i) => {
        if (i > 2) {
            const sum1 = entries[i - 3] + entries[i - 2] + entries[i - 1];
            const sum2 = entries[i - 2] + entries[i - 1] + entries[i];
            if (sum1 < sum2) count++;
        }
        return count;
    }, 0);
};

run().then((result) => console.log(`Result: ${result}`));
