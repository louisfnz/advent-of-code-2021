import {part2, part1} from './index';

const exampleInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

describe('Day 15', () => {
    it('Calculates part 1 correctly', () => {
        const result = part1(exampleInput);
        expect(result).toEqual(40);
    });

    it('Calculates part 2 correctly', () => {
        const result = part2(exampleInput);
        expect(result).toEqual(315);
    });
});
