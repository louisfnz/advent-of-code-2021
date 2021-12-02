import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input.trim().split('\n').map<[string, number]>((entry: string) => {
        const split = entry.split(' ');
        return [split[0].trim(), Number(split[1].trim())];
    });

    let depth = 0;
    let pos = 0;
    let aim = 0;

    for (const [command, value] of entries) {
        if (command === 'up') aim -= value;
        if (command === 'down') aim += value;
        if (command === 'forward') {
            pos += value;
            if (aim !== 0) {
                depth += value * aim;
            }
        }
    }

    return depth * pos;
}

run().then(result => console.log(`Result: ${result}`));

