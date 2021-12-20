import {part2, part1} from './index';

const exampleInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe('Day 9', () => {
    it('Calculates part 1 correctly', () => {
        const result = part1(exampleInput);
        expect(result).toEqual(15);
    });

    it('Calculates part 2 correctly', () => {
        const result = part2(exampleInput);
        expect(result).toEqual(1134);
    });
});
