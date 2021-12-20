import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getEntries = (input: string): string[][] =>
    input
        .trim()
        .split('\n')
        .map((item) => item.split('-'));

const getPathMap = (entries: string[][]) => {
    const paths: Record<string, string[]> = {};

    for (const entry of entries) {
        if (!paths[entry[0]]) {
            paths[entry[0]] = [entry[1]];
        } else {
            paths[entry[0]].push(entry[1]);
        }
        if (!paths[entry[1]]) {
            paths[entry[1]] = [entry[0]];
        } else {
            paths[entry[1]].push(entry[0]);
        }
    }

    return paths;
};

const isLowerCase = (s: string) => s === s.toLowerCase();

export const part1 = (input: string) => {
    const entries = getEntries(input);
    const paths = getPathMap(entries);

    const search = (entry: string, visits: Record<string, number>) => {
        if (entry === 'end') return 1;
        if (isLowerCase(entry) && visits[entry]) return 0;

        let total = 0;

        visits[entry] = 1;

        for (const choice of paths[entry]) {
            total += search(choice, visits);
        }

        visits[entry] = 0;

        return total;
    };

    return search('start', {});
};

export const part2 = (input: string) => {
    const entries = getEntries(input);
    const paths = getPathMap(entries);

    const search = (entry: string, visits: Record<string, number>) => {
        if (entry === 'end') return 1;
        if (isLowerCase(entry) && visits[entry]) {
            const visitedTwice = Object.keys(visits).reduce((acc, cur) => {
                if (isLowerCase(cur) && visits[cur] > 1) return true;
                return acc;
            }, false);
            if (visitedTwice) return 0;
        }

        let total = 0;

        visits[entry] = !visits[entry] ? 1 : visits[entry] + 1;

        for (const choice of paths[entry].filter((p) => p !== 'start')) {
            total += search(choice, visits);
        }

        visits[entry] = visits[entry] - 1;

        return total;
    };

    return search('start', {});
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
