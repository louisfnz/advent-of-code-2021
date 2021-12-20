import {part2, part1} from './index';

const exampleInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

describe('Day 11', () => {
    it('Calculates part 1 correctly', () => {
        const result = part1(exampleInput);
        expect(result).toEqual(1656);
    });

    it('Calculates part 2 correctly', () => {
        const result = part2(exampleInput);
        expect(result).toEqual(195);
    });
});
