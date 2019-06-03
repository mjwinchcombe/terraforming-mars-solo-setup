import { HexagonalMap } from "../map/HexagonalMap";
import { LandHex, WaterHex, NoctisCityHex, MarsHex } from "./MarsHexes";

export class MarsMap extends HexagonalMap<MarsHex> {
    constructor(hexes: MarsHex[][]) {
        super(hexes)
    }

    getTopLeftHex(): MarsHex {
        return this.getHexAt(0, 0)
    }

    getBottomRightHex(): MarsHex {
        let lastRowIndex = this._hexes.length - 1
        let lastRow = this._hexes[lastRowIndex]
        let lastColumnIndex = lastRow.length - 1
        return this.getHexAt(lastRowIndex, lastColumnIndex)
    }

    getFirstHexInRow(rowIndex: number): MarsHex {
        this.checkValidRowIndex(rowIndex)
        let row = this._hexes[rowIndex]
        return row[0]
    }

    getLastHexInRow(rowIndex: number): MarsHex {
        this.checkValidRowIndex(rowIndex)
        let row = this._hexes[rowIndex]
        return row[row.length - 1]
    }

    private checkValidRowIndex(rowIndex: number): void {
        if (rowIndex >= this._hexes.length || rowIndex < 0) {
            throw Error(`Row ${rowIndex} does not exist in map`)
        }
    }

    getLastRowNumber(): number {
        return this._hexes.length - 1
    }
}

export class StandardMarsMap extends MarsMap {
    constructor() {
        super([[new LandHex(), new WaterHex(),new LandHex(), new WaterHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new LandHex(),  new LandHex(), new LandHex(), new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new NoctisCityHex(), new WaterHex(), new WaterHex(), new WaterHex(), new LandHex(), new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex(), new WaterHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(),  new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex()]
    ])
}
    
}