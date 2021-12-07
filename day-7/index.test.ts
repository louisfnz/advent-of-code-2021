import {calculateFuel} from './index';

const exampleInput = '16,1,2,0,4,2,7,1,2,14';

describe('Day 7', () => {
    it('Calculates part 1 correctly', () => {
        const result = calculateFuel(exampleInput, 1);
        expect(result).toEqual(37);
    });

    it('Calculates part 2 correctly', () => {
        const result = calculateFuel(exampleInput, 2);
        expect(result).toEqual(168);
    });
});
