import {part2, part1} from './index';

const exampleInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

describe('Day 10', () => {
    it('Calculates part 1 correctly', () => {
        const result = part1(exampleInput);
        expect(result).toEqual(26397);
    });

    it('Calculates part 2 correctly', () => {
        const result = part2(exampleInput);
        expect(result).toEqual(288957);
    });
});
