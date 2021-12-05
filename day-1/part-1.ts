import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => Number(entry.trim()));

    return entries.reduce((count, entry, i) => {
        if (entries[i - 1] && entries[i - 1] < entry) {
            count++;
        }
        return count;
    }, 0);
};

run().then((result) => console.log(`Result: ${result}`));
