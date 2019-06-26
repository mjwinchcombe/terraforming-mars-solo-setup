import { HexEdges } from "../../map/Hex";
import { MarsHex } from "../MarsHex";
import { MarsMap } from "../MarsMaps";
import { CityTile } from "../tiles/CityTile";

export abstract class CityHexFinder {
    private currentHex: MarsHex;

    constructor(readonly map: MarsMap, readonly hexEdgeToTry: HexEdges) {
        this.currentHex = this.getStartingHex();
    }

    protected abstract getStartingHex();

    public findHexForCity(city: CityTile, targetHexCount: number): MarsHex {
        let currentHexCount = 0;
        do {
            if (this.currentHex.canTileBePlaced(city)) {
                currentHexCount++;
            }
            if (currentHexCount !== targetHexCount) {
                this.updateCurrentHexToNextHex();
            }

        } while (currentHexCount !== targetHexCount);
        return this.currentHex;
    }

    private updateCurrentHexToNextHex(): void {
        if (this.currentHex.isHexConnectedAt(this.hexEdgeToTry)) {
            this.currentHex = this.currentHex.getHexConnectedAt(this.hexEdgeToTry) as MarsHex;
        } else {
            this.currentHex = this.getHexFromNextRow();
        }
    }

    protected abstract getHexFromNextRow(): MarsHex;
}
