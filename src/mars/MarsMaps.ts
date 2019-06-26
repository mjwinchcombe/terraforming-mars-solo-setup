import { HexagonalMap } from "../map/HexagonalMap";
import { MarsHex } from "./MarsHex";

export class MarsMap extends HexagonalMap<MarsHex> {
    constructor(hexes: MarsHex[][]) {
        super(hexes);
    }

    public getTopLeftHex(): MarsHex {
        return this.getHexAt(0, 0);
    }

    public getBottomRightHex(): MarsHex {
        const lastRowIndex = this.hexes.length - 1;
        const lastRow = this.hexes[lastRowIndex];
        const lastColumnIndex = lastRow.length - 1;
        return this.getHexAt(lastRowIndex, lastColumnIndex);
    }

    public getFirstHexInRow(rowIndex: number): MarsHex {
        this.checkValidRowIndex(rowIndex);
        const row = this.hexes[rowIndex];
        return row[0];
    }

    public getLastHexInRow(rowIndex: number): MarsHex {
        this.checkValidRowIndex(rowIndex);
        const row = this.hexes[rowIndex];
        return row[row.length - 1];
    }

    private checkValidRowIndex(rowIndex: number): void {
        if (rowIndex >= this.hexes.length || rowIndex < 0) {
            throw Error(`Row ${rowIndex} does not exist in map`);
        }
    }

    public getLastRowNumber(): number {
        return this.hexes.length - 1;
    }
}
