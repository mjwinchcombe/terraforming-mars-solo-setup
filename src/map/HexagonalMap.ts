import { Hex, HexEdges } from "./Hex"

class HexagonalHexesValidator<H extends Hex<any>> {

    private increasing: boolean = true
    private currentRowNumber: number = 0
    private currentRowLength: number
    private nextRowLength: number
    private rowLengthDifference: number

    constructor(readonly hexes: H[][]) {
    }

    validate(): void {
        while(this.currentRowNumber <= this.getSecondToLastRowNumber()) {
            this.calculateRowLengths()
            this.rowLengthDifference = this.nextRowLength - this.currentRowLength
            this.checkRowLengthsIncreaseThenDecreases()
            this.checkRowLengthDifference()
            this.currentRowNumber++
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
            throw Error('Map layout is not hexagonal the length of rows cannot increase again after decreasing.' 
                + ` Row ${this.currentRowNumber} has ${this.currentRowLength} hexes,`
                + ` Row ${this.currentRowNumber + 1} has ${this.nextRowLength} hexes`)
        }
    }

    private checkRowLengthDifference(): void {
        if (Math.abs(this.rowLengthDifference) != 1) {
            let expectedNextRowLength = this.getExpectedLengthOfNextRow();
            throw Error(`Map layout is not hexagonal expect row ${this.currentRowNumber + 1}` 
                + ` to contain ${expectedNextRowLength} hexes not ${this.nextRowLength}`)
        }
    }

    private getExpectedLengthOfNextRow(): number {
        if (this.increasing) {
            return this.currentRowLength + 1
        } else {
            return this.currentRowLength - 1
        }
    }
}

export class HexagonalMap<H extends Hex<any>> {
    static buildFrom2dArray<H extends Hex<any>>(array: H[][]): HexagonalMap<H> {
        return new HexagonalMap(array)
    }

    readonly _hexes: H[][];

    protected constructor(hexes: H[][]) {
        this._hexes = hexes
        this.validateHexesDesribeHexagonalMap()
        this.connectRows();
    }

    private validateHexesDesribeHexagonalMap(): void {
        new HexagonalHexesValidator(this._hexes).validate();
    }

    private connectRows(): void {
        for (let rowNumber = 0; rowNumber < this._hexes.length; rowNumber++) {
            let row = this._hexes[rowNumber]
            this.connectHexesInRow(row)
            this.connectHexesToNextRow(row, rowNumber)
        }
    }

    private connectHexesInRow(row: H[]): void {
        const lastConnectableHexNumber = this.getLastConnectableHexNumber(row)
        for (let hexNumber = 0; hexNumber <= lastConnectableHexNumber; hexNumber++) {
            let hex = row[hexNumber];
            let nexHex = row[hexNumber + 1]
            hex.connectHex(nexHex, HexEdges.MIDDLE_RIGHT)
        }
    }

    private getLastConnectableHexNumber(row: H[]): number {
        return row.length - 2;
    }

    private connectHexesToNextRow(row: H[], rowNumber: number): void {
        if (this.isSecondToLastRow(rowNumber)) {
            return;
        }
        let nextRow = this._hexes[rowNumber + 1]
        if (this.isNextRowLarger(row, nextRow)) {
            this.connectToLargerRow(row, nextRow)
        } else {
            this.connectToSmallerRow(row, nextRow)
        }
    }

    private isSecondToLastRow(rowNumber: number): boolean {
        return rowNumber >= this._hexes.length - 1
    }

    private isNextRowLarger(row: H[], nextRow: H[]): boolean {
        return nextRow.length > row.length
    }

    private connectToLargerRow(row: H[], rowToConnectTo: H[]) {
        for (let hexNumber = 0; hexNumber < row.length; hexNumber++) {
            let hex = row[hexNumber]
            let hexForBottomLeft = rowToConnectTo[hexNumber]
            let hexForBottomRight = rowToConnectTo[hexNumber + 1]
            hex.connectHex(hexForBottomLeft, HexEdges.BOTTOM_LEFT)
            hex.connectHex(hexForBottomRight, HexEdges.BOTTOM_RIGHT)
        }
    }

    private connectToSmallerRow(row: H[], rowToConnectTo: H[]) {
        for (let hexNumber = 0; hexNumber < row.length; hexNumber++) {
            let hex = row[hexNumber]
            
            if (hexNumber < rowToConnectTo.length) {
                let hexForBottomRight = rowToConnectTo[hexNumber]
                hex.connectHex(hexForBottomRight, HexEdges.BOTTOM_RIGHT)
            }

            if (hexNumber > 0 && hexNumber <= rowToConnectTo.length) {
                let hexForBottomLeft = rowToConnectTo[hexNumber - 1]
                hex.connectHex(hexForBottomLeft, HexEdges.BOTTOM_LEFT)
            }
        }
    }

    getHexAt(row: number, column: number): H { 
        if (this.isHexAt(row, column)) {
            return this._hexes[row][column]
        }
        throw Error(`No hex at row ${row} column ${column}`)
    }

    isHexAt(rowNumber: number, columnNumber: number): boolean {
        if (rowNumber < this._hexes.length) {
            let row = this._hexes[rowNumber]
            return columnNumber < row.length
        }
        return false;
    }
} 