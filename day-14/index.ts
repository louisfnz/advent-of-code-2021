import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getEntries = (input: string): [string, string[][]] => {
    const parts = input.trim().split('\n\n');
    return [parts[0].trim(), parts[1].split('\n').map((item) => item.split('->').map((item) => item.trim()))];
};

export const polymerization = (input: string, steps: number) => {
    let [polymer, rules] = getEntries(input);

    let pairCounts: Record<string, number> = {};
    let elementCounts: Record<string, number> = {};

    for (let i = 0; i < polymer.length; i++) {
        const element = polymer[i];
        elementCounts[element] = !elementCounts[element] ? 1 : elementCounts[element] + 1;

        if (i < polymer.length - 1) {
            const pair = polymer[i] + polymer[i + 1];
            pairCounts[pair] = !pairCounts[pair] ? 1 : pairCounts[pair] + 1;
        }
    }

    for (let i = 1; i <= steps; i++) {
        pairCounts = Object.keys(pairCounts).reduce((acc, pair) => {
            const rule = rules.find((rule) => rule[0] === pair);

            if (rule) {
                const element = rule[1];
                const pairCount = pairCounts[pair];
                const newPair1 = pair[0] + element;
                const newPair2 = element + pair[1];

                elementCounts[element] = elementCounts[element] ? elementCounts[element] + pairCount : pairCount;
                acc[newPair1] = acc[newPair1] ? acc[newPair1] + pairCount : pairCount;
                acc[newPair2] = acc[newPair2] ? acc[newPair2] + pairCount : pairCount;
            }

            return acc;
        }, {} as Record<string, number>);
    }

    const [min, max] = Object.keys(elementCounts).reduce(
        (acc, key) => {
            if (elementCounts[key] < acc[0]) acc[0] = elementCounts[key];
            if (elementCounts[key] > acc[1]) acc[1] = elementCounts[key];
            return acc;
        },
        [Infinity, -Infinity],
    );

    return max - min;
};

export const part1 = (input: string) => {
    return polymerization(input, 10);
};

export const part2 = (input: string) => {
    return polymerization(input, 40);
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
