import {readFile} from 'fs/promises';

const run = async () => {
    const input = await readFile(__dirname + '/input.txt', 'utf-8');
    const entries = input
        .trim()
        .split('\n\n')
        .map((entry: string) => entry.trim());

    const map: Record<string, number[]> = {};
    const boards: number[][][] = [];
    const draw = entries[0].split(',').map(Number);

    const isWinningBoard = (boardIndex: number) => {
        for (let i = 0; i < 5; i++) {
            if (boards[boardIndex][i][0] + boards[boardIndex][i][1] + boards[boardIndex][i][2] + boards[boardIndex][i][3] + boards[boardIndex][i][4] === -5) return true;
            if (boards[boardIndex][0][i] + boards[boardIndex][1][i] + boards[boardIndex][2][i] + boards[boardIndex][3][i] + boards[boardIndex][4][i] === -5) return true;
        }
    };

    const calculateResult = (boardIndex: number, lastNum: number) => {
        const sum = boards[boardIndex].reduce((acc, row) => {
            let sum = 0;
            row.forEach((num) => {
                if (num > -1) sum += num;
            });
            return acc + sum;
        }, 0);

        return sum * Number(lastNum);
    };

    entries.slice(1).forEach((board, b) => {
        boards.push(
            board.split('\n').map((row) =>
                row
                    .trim()
                    .replace(/\s\s+/g, ' ')
                    .split(' ')
                    .map((num) => {
                        if (!map[num]) map[num] = [];
                        map[num].push(b);
                        return Number(num);
                    }),
            ),
        );
    });

    for (const num of draw) {
        const boardIndices = map[num];
        if (boardIndices) {
            for (const b of boardIndices) {
                for (let r = 0; r < boards[b].length; r++) {
                    const c = boards[b][r].indexOf(num);
                    if (c !== -1) boards[b][r][c] = -1;
                }
                if (isWinningBoard(b)) {
                    return calculateResult(b, num);
                }
            }
        }
    }
};

run().then((result) => console.log(`Result: ${result}`));
