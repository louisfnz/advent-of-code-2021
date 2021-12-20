import {part2, part1} from './index';

const exampleInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

describe('Day 14', () => {
    it('Calculates part 1 correctly', () => {
        const result = part1(exampleInput);
        expect(result).toEqual(1588);
    });

    it('Calculates part 2 correctly', () => {
        const result = part2(exampleInput);
        console.log(result);
        expect(result).toEqual(2188189693529);
    });
});
