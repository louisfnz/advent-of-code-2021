import {countFish} from './index';

const exampleInput = '3,4,3,1,2';

describe('Day 6', () => {
    it('Calculates part 1 correctly', () => {
        const result = countFish(exampleInput, 80);
        expect(result).toEqual(5934);
    });

    it('Calculates part 2 correctly', () => {
        const result = countFish(exampleInput, 256);
        expect(result).toEqual(26984457539);
    });
});
