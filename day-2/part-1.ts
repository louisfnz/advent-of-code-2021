import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map<[string, number]>((entry: string) => {
            const split = entry.split(' ');
            return [split[0].trim(), Number(split[1].trim())];
        });

    let depth = 0;
    let pos = 0;

    for (const [command, value] of entries) {
        if (command === 'up') depth -= value;
        if (command === 'down') depth += value;
        if (command === 'forward') pos += value;
    }

    return depth * pos;
};

run().then((result) => console.log(`Result: ${result}`));
