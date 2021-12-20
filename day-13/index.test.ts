import {part2, part1} from './index';

const exampleInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe('Day 13', () => {
    it('Calculates part 1 correctly', () => {
        const result = part1(exampleInput);
        expect(result).toEqual(17);
    });

    it('Calculates part 2 correctly', () => {
        const result = part2(exampleInput);
        console.log(result);
        expect(result).toEqual(`

#####
#   #
#   #
#   #
#####
`);
    });
});
