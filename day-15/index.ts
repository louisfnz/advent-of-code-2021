import {readFileSync} from 'fs';

const input = readFileSync(__dirname + '/input.txt', 'utf-8');

const getGrid = (input: string): number[][] => {
    const lines = input.trim().split('\n');
    return lines.map((line) => line.trim().split('').map(Number));
};

type Cell = {y: number; x: number; value: number};

const pathFinder = (grid: number[][], cellsToVisit: Map<string, Cell>, finish: Cell) => {
    let current = cellsToVisit.get('0,0') as Cell;
    current.value = 0;

    const adjacentVectors = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];

    while (cellsToVisit.size > 0) {
        console.log(cellsToVisit.size);
        if (current.y === finish.y && current.x === finish.x) {
            return current.value;
        }

        const adjacentToVisit = [];
        for (const adjacent of adjacentVectors) {
            const next = {y: current.y + adjacent[0], x: current.x + adjacent[1]};

            if (next.y >= 0 && next.y < grid.length && next.x >= 0 && next.x < grid[0].length) {
                const value = cellsToVisit.get(`${next.x},${next.y}`);
                if (value) {
                    adjacentToVisit.push(value);
                }
            }
        }

        for (const cell of adjacentToVisit) {
            const newValue = current.value + grid[cell.y][cell.x];

            if (cell.value > newValue) {
                cell.value = newValue;
            }
        }

        cellsToVisit.delete(`${current.x},${current.y}`);

        let min = Infinity;
        let currentMinItem = undefined;

        cellsToVisit.forEach((cell) => {
            if (cell.value < min) {
                min = cell.value;
                currentMinItem = cell;
            }
        });

        current = currentMinItem as unknown as Cell;
    }

    return current.value;
};

export const part1 = (input: string) => {
    const grid = getGrid(input);

    const cellsToVisit = new Map<string, Cell>();

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            cellsToVisit.set(`${x},${y}`, {
                x,
                y,
                value: Infinity,
            });
        }
    }

    const finish: Cell = {
        y: grid.length - 1,
        x: grid[0].length - 1,
        value: grid[grid.length - 1][grid[0].length - 1],
    };

    return pathFinder(grid, cellsToVisit, finish);
};

export const part2 = (input: string) => {
    const grid = getGrid(input);

    const createSection = (grid: number[][]) => {
        const section = new Array(grid.length);
        for (let i = 0; i < grid.length; i++) {
            section[i] = new Array(grid[0].length);
            for (let j = 0; j < grid[i].length; j++) {
                section[i][j] = grid[i][j] === 9 ? 1 : grid[i][j] + 1;
            }
        }
        return section;
    };

    const gridMap = new Map<number, number[][]>();
    gridMap.set(0, grid);

    const bigGridSections = new Array(5);
    bigGridSections[0] = new Array(5);

    for (let i = 0; i < bigGridSections.length; i++) {
        bigGridSections[i] = new Array(bigGridSections.length);
        let index = i;
        for (let j = 0; j < bigGridSections[i].length; j++) {
            const section = gridMap.get(index);
            if (section) {
                bigGridSections[i][j] = section;
            } else {
                const newTile = createSection(gridMap.get(index - 1) as number[][]);
                gridMap.set(index, newTile);
                bigGridSections[i][j] = newTile;
            }

            index++;
        }
    }

    const bigGrid = new Array(bigGridSections.length * grid.length);

    for (let i = 0; i < bigGrid.length; i++) {
        bigGrid[i] = new Array(bigGridSections.length * grid.length);
    }

    for (let i = 0; i < bigGridSections.length; i++) {
        for (let j = 0; j < bigGridSections[0].length; j++) {
            const currentTile = bigGridSections[i][j];
            for (let y = 0; y < currentTile.length; y++) {
                for (let x = 0; x < currentTile[y].length; x++) {
                    bigGrid[y + i * currentTile.length][x + j * currentTile[i].length] = currentTile[y][x];
                }
            }
        }
    }

    const cellsToVisit = new Map<string, Cell>();

    for (let y = 0; y < bigGrid.length; y++) {
        for (let x = 0; x < bigGrid[0].length; x++) {
            cellsToVisit.set(`${x},${y}`, {
                x,
                y,
                value: Infinity,
            });
        }
    }

    const finish: Cell = {
        y: bigGrid.length - 1,
        x: bigGrid[0].length - 1,
        value: bigGrid[bigGrid.length - 1][bigGrid[0].length - 1],
    };

    return pathFinder(bigGrid, cellsToVisit, finish);
};

console.log('Part 1: ', part1(input));
console.log('Part 2: ', part2(input));
