import { HexEdges } from "../../map/Hex";
import { MarsHex } from "../MarsHex";
import { MarsMap } from "../MarsMaps";
import { CityHexFinder } from "./CityHexFinder";

export class FirstCityHexFinder extends CityHexFinder {
    private currentMapRow: number;
    constructor(readonly map: MarsMap) {
        super(map, HexEdges.MIDDLE_RIGHT);
        this.currentMapRow = 0;
    }

    protected getStartingHex() {
        return this.map.getTopLeftHex();
    }

    protected getHexFromNextRow(): MarsHex {
        try {
            this.currentMapRow++;
            return this.map.getFirstHexInRow(this.currentMapRow);
        } catch (e) {
            this.currentMapRow = 0;
            return this.map.getFirstHexInRow(this.currentMapRow);
        }
    }
}
