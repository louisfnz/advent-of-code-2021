import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getEntries = (input: string): string[][] =>
    input
        .trim()
        .split('\n')
        .map((line) => {
            return line.split('|').map((item) => item.trim());
        });

export const part1 = (input: string) => {
    const entries = getEntries(input);

    return entries.reduce((acc, cur) => {
        let count = 0;
        cur[1].split(' ').forEach((item) => {
            if ([2, 7, 4, 3].includes(item.length)) count++;
        });
        return acc + count;
    }, 0);
};

export const part2 = (input: string) => {
    const entries = getEntries(input);
    let outputTotal = 0;

    for (const entry of entries) {
        const digitMap: Record<string, string> = {
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: '',
            8: '',
            9: '',
        };

        const patterns = entry[0].split(' ').map((p) => p.split('').sort().join(''));

        // Work out, 1, 7, 4 & 8
        digitMap[1] = patterns.find((p) => p.length === 2) || '';
        digitMap[7] = patterns.find((p) => p.length === 3) || '';
        digitMap[4] = patterns.find((p) => p.length === 4) || '';
        digitMap[8] = patterns.find((p) => p.length === 7) || '';

        // Work out 3
        for (const pattern of patterns.filter((p) => p.length === 5)) {
            const count = digitMap[7].split('').reduce((acc, letter) => {
                if (pattern.includes(letter)) acc++;
                return acc;
            }, 0);
            if (count === 3) {
                digitMap[3] = pattern;
            }
        }

        for (const pattern of patterns) {
            if (pattern.length === 5) {
                // Work out 2 and 5
                if (pattern !== digitMap[3]) {
                    const temp = digitMap[4].split('').reduce((acc, letter) => acc.replace(letter, ''), pattern);
                    if (temp.length === 2) {
                        digitMap[5] = pattern;
                    } else {
                        digitMap[2] = pattern;
                    }
                }
            }
            if (pattern.length === 6) {
                // Work out 9
                const temp = digitMap[4].split('').reduce((acc, letter) => acc.replace(letter, ''), pattern);
                if (temp.length === 2) {
                    digitMap[9] = pattern;
                }
            }
        }

        for (const pattern of patterns.filter((p) => p.length === 6 && p !== digitMap[9])) {
            const temp = digitMap[1].split('').reduce((acc, letter) => acc.replace(letter, ''), pattern);
            if (temp.length === 4) {
                digitMap[0] = pattern;
            } else {
                digitMap[6] = pattern;
            }
        }

        const output = entry[1].split(' ').map((p) => p.split('').sort().join(''));
        const value = output.reduce((acc, cur) => {
            for (const digit of Object.keys(digitMap)) {
                if (cur === digitMap[digit]) {
                    return acc + digit;
                }
            }
            return acc;
        }, '');

        outputTotal += Number(value);
    }

    return outputTotal;
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
