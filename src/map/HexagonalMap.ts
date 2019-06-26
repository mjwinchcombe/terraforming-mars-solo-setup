import { Hex, HexEdges } from "./Hex";
import { HexagonalHexesValidator } from "./HexagonalHexesValidator";

export class HexagonalMap<H extends Hex<any>> {
    public static buildFrom2dArray<H extends Hex<any>>(array: H[][]): HexagonalMap<H> {
        return new HexagonalMap(array);
    }

    protected readonly hexes: H[][];

    protected constructor(hexes: H[][]) {
        this.hexes = hexes;
        this.validateHexesDesribeHexagonalMap();
        this.connectRows();
    }

    private validateHexesDesribeHexagonalMap(): void {
        new HexagonalHexesValidator(this.hexes).validate();
    }

    private connectRows(): void {
        for (let rowNumber = 0; rowNumber < this.hexes.length; rowNumber++) {
            const row = this.hexes[rowNumber];
            this.connectHexesInRow(row);
            this.connectHexesToNextRow(row, rowNumber);
        }
    }

    private connectHexesInRow(row: H[]): void {
        const lastConnectableHexNumber = this.getLastConnectableHexNumber(row);
        for (let hexNumber = 0; hexNumber <= lastConnectableHexNumber; hexNumber++) {
            const hex = row[hexNumber];
            const nexHex = row[hexNumber + 1];
            hex.connectHex(nexHex, HexEdges.MIDDLE_RIGHT);
        }
    }

    private getLastConnectableHexNumber(row: H[]): number {
        return row.length - 2;
    }

    private connectHexesToNextRow(row: H[], rowNumber: number): void {
        if (this.isSecondToLastRow(rowNumber)) {
            return;
        }
        const nextRow = this.hexes[rowNumber + 1];
        if (this.isNextRowLarger(row, nextRow)) {
            this.connectToLargerRow(row, nextRow);
        } else {
            this.connectToSmallerRow(row, nextRow);
        }
    }

    private isSecondToLastRow(rowNumber: number): boolean {
        return rowNumber >= this.hexes.length - 1;
    }

    private isNextRowLarger(row: H[], nextRow: H[]): boolean {
        return nextRow.length > row.length;
    }

    private connectToLargerRow(row: H[], rowToConnectTo: H[]) {
        for (let hexNumber = 0; hexNumber < row.length; hexNumber++) {
            const hex = row[hexNumber];
            const hexForBottomLeft = rowToConnectTo[hexNumber];
            const hexForBottomRight = rowToConnectTo[hexNumber + 1];
            hex.connectHex(hexForBottomLeft, HexEdges.BOTTOM_LEFT);
            hex.connectHex(hexForBottomRight, HexEdges.BOTTOM_RIGHT);
        }
    }

    private connectToSmallerRow(row: H[], rowToConnectTo: H[]) {
        for (let hexNumber = 0; hexNumber < row.length; hexNumber++) {
            const hex = row[hexNumber];

            if (hexNumber < rowToConnectTo.length) {
                const hexForBottomRight = rowToConnectTo[hexNumber];
                hex.connectHex(hexForBottomRight, HexEdges.BOTTOM_RIGHT);
            }

            if (hexNumber > 0 && hexNumber <= rowToConnectTo.length) {
                const hexForBottomLeft = rowToConnectTo[hexNumber - 1];
                hex.connectHex(hexForBottomLeft, HexEdges.BOTTOM_LEFT);
            }
        }
    }

    public getHexAt(row: number, column: number): H {
        if (this.isHexAt(row, column)) {
            return this.hexes[row][column];
        }
        throw Error(`No hex at row ${row} column ${column}`);
    }

    public isHexAt(rowNumber: number, columnNumber: number): boolean {
        if (rowNumber < this.hexes.length) {
            const row = this.hexes[rowNumber];
            return columnNumber < row.length;
        }
        return false;
    }
}
