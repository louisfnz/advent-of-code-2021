import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => {
            const split = entry.split('-');
            const [x1, y1] = split[0].trim().split(',').map(Number);
            const [x2, y2] = split[1].replace('>', '').trim().split(',').map(Number);
            return {x1, y1, x2, y2};
        });

    const map: Record<string, number> = {};

    const addToMap = (position: {x: number; y: number}) => {
        const key = `${position.x},${position.y}`;
        map[key] = !map[key] ? 1 : map[key] + 1;
    };

    for (const entry of entries) {
        const {x1, y1, x2, y2} = entry;
        let position = {x: x1, y: y1};
        addToMap(position);
        while (true) {
            position.x += x1 === x2 ? 0 : x2 > x1 ? 1 : -1;
            position.y += y1 === y2 ? 0 : y2 > y1 ? 1 : -1;
            addToMap(position);
            if (position.x === x2 && position.y === y2) break;
        }
    }

    return Object.keys(map).reduce((acc, cur) => (map[cur] > 1 ? acc + 1 : acc), 0);
};

run().then((result) => console.log(`Result: ${result}`));
