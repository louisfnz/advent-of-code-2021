import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n')
        .map((entry: string) => entry.trim());

    let ratings: string[] = [];

    for (let i = 0; i < 2; i++) {
        let nums = [...entries];
        let bit = 0;
        while (nums.length > 1) {
            const zeroCount = nums.reduce((acc, cur) => {
                if (cur[bit] === '0') acc++;
                return acc;
            }, 0);
            nums = nums.filter((item) => {
                let search = '1';
                let condition = i === 0 ? zeroCount > nums.length / 2 : zeroCount <= nums.length / 2;
                if (condition) {
                    search = '0';
                }
                return item[bit] === search;
            });
            bit++;
        }
        ratings[i] = nums[0];
    }

    return parseInt(ratings[0], 2) * parseInt(ratings[1], 2);
};

run().then((result) => console.log(`Result: ${result}`));
