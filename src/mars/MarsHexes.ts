import { Hex } from "../map/Hex";
import { MarsTile } from "./MarsTiles";

export abstract class MarsHex extends Hex<MarsTile> {
    abstract canTileBePlaced(tile: MarsTile): boolean
    abstract name(): string

    placeTile(tile: MarsTile) {
        if (this.canTileBePlaced(tile)) {
            super.placeTile(tile)
        } else {
            throw Error(`Cannot place a ${tile.name()} on ${this.name()}`)
        }
    }
}

export class LandHex extends MarsHex {
    canTileBePlaced(tile: MarsTile): boolean {
        return tile.canBePlacedOnLand();
    }

    name(): string {
        return "land"
    }
}

export class WaterHex extends MarsHex {
    canTileBePlaced(tile: MarsTile): boolean {
        return tile.canBePlacedOnWater();
    }

    name(): string {
        return "water"
    }
}

export class NoctisCityHex extends MarsHex {  
    canTileBePlaced(tile: MarsTile): boolean {
        return false;
    }

    name(): string {
        return "Noctis city"
    }
}