import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getLines = (input: string): string[] => input.trim().split('\n');

type ClosingBracket = '}' | ']' | '>' | ')';

const closingBracketMap: Record<string, string> = {
    '}': '{',
    ')': '(',
    ']': '[',
    '>': '<',
};

const openingBracketMap: Record<string, string> = {
    '{': '}',
    '(': ')',
    '[': ']',
    '<': '>',
};

const findSyntaxError = (line: string) => {
    const queue = [];
    for (let i = 0; i < line.length; i++) {
        if (!closingBracketMap[line[i]]) {
            queue.push(line[i]);
        } else {
            if (closingBracketMap[line[i]] !== queue.pop()) {
                return line[i];
            }
        }
    }
    return false;
};

export const part1 = (input: string) => {
    const lines = getLines(input);
    const pointsMap = {
        '}': 1197,
        ')': 3,
        ']': 57,
        '>': 25137,
    };
    let points = 0;

    for (const line of lines) {
        const error = findSyntaxError(line);
        if (error) {
            points += pointsMap[error as ClosingBracket];
        }
    }

    return points;
};

export const part2 = (input: string) => {
    const lines = getLines(input);
    const pointsMap = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4,
    };

    const scores = [];

    for (const line of lines) {
        const error = findSyntaxError(line);
        if (error) continue;

        const queue = [];
        for (let i = 0; i < line.length; i++) {
            if (!closingBracketMap[line[i]]) {
                queue.push(line[i]);
            } else {
                queue.pop();
            }
        }

        const score = queue.reverse().reduce((acc, char) => {
            const points = pointsMap[openingBracketMap[char] as ClosingBracket];
            return acc * 5 + points;
        }, 0);

        scores.push(score);
    }

    return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
