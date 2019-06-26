import { HexEdges } from "../../map/Hex";
import { MarsHex } from "../MarsHex";
import { MarsMap } from "../MarsMaps";
import { CityHexFinder } from "./CityHexFinder";

export class SecondCityHexFinder extends CityHexFinder {
    private currentMapRow: number;
    constructor(readonly map: MarsMap) {
        super(map, HexEdges.MIDDLE_LEFT);
        this.currentMapRow = map.getLastRowNumber();
    }

    protected getStartingHex() {
        return this.map.getBottomRightHex();
    }

    protected getHexFromNextRow(): MarsHex {
        try {
            this.currentMapRow--;
            return this.map.getLastHexInRow(this.currentMapRow);
        } catch (e) {
            this.currentMapRow = this.map.getLastRowNumber();
            return this.map.getLastHexInRow(this.currentMapRow);
        }
    }
}
