import { Hex } from "./Hex";

export class HexagonalHexesValidator<H extends Hex<any>> {

    private increasing: boolean = true;
    private currentRowNumber: number = 0;
    private currentRowLength: number;
    private nextRowLength: number;
    private rowLengthDifference: number;

    constructor(readonly hexes: H[][]) {
    }

    public validate(): void {
        while (this.currentRowNumber <= this.getSecondToLastRowNumber()) {
            this.calculateRowLengths();
            this.rowLengthDifference = this.nextRowLength - this.currentRowLength;
            this.checkRowLengthsIncreaseThenDecreases();
            this.checkRowLengthDifference();
            this.currentRowNumber++;
        }
    }

    private getSecondToLastRowNumber(): number {
        return this.hexes.length - 2;
    }

    private calculateRowLengths(): void {
        this.currentRowLength = this.hexes[this.currentRowNumber].length;
        this.nextRowLength = this.hexes[this.currentRowNumber + 1].length;
    }

    private checkRowLengthsIncreaseThenDecreases(): void {
        if (this.rowLengthDifference < 0) {
            this.increasing = false;
        } else if (!this.increasing) {
            throw Error("Map layout is not hexagonal the length of rows cannot increase again after decreasing."
                + ` Row ${this.currentRowNumber} has ${this.currentRowLength} hexes,`
                + ` Row ${this.currentRowNumber + 1} has ${this.nextRowLength} hexes`);
        }
    }

    private checkRowLengthDifference(): void {
        if (Math.abs(this.rowLengthDifference) !== 1) {
            const expectedNextRowLength = this.getExpectedLengthOfNextRow();
            throw Error(`Map layout is not hexagonal expect row ${this.currentRowNumber + 1}`
                + ` to contain ${expectedNextRowLength} hexes not ${this.nextRowLength}`);
        }
    }

    private getExpectedLengthOfNextRow(): number {
        if (this.increasing) {
            return this.currentRowLength + 1;
        } else {
            return this.currentRowLength - 1;
        }
    }
}
