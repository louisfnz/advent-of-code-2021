import {part2, part1} from './index';

const exampleInputOne = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const exampleInputTwo = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

describe('Day 12', () => {
    it('Calculates part 1 correctly', () => {
        const result1 = part1(exampleInputOne);
        expect(result1).toEqual(10);
        const result2 = part1(exampleInputTwo);
        expect(result2).toEqual(19);
    });

    it('Calculates part 2 correctly', () => {
        const result1 = part2(exampleInputOne);
        expect(result1).toEqual(36);
        const result2 = part2(exampleInputTwo);
        expect(result2).toEqual(103);
    });
});
