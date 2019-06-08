import { Hex } from "../map/Hex";
import { MarsTile } from "./MarsTiles";
import { Tile } from "../map/Tile";

export abstract class MarsHex extends Hex<MarsTile> {
    abstract name(): string

    protected createTilePlacementErrorMessage(tile: MarsTile): string { 
        return `Cannot place a ${tile.name()} on ${this.name()}`
    }
}

export class LandHex extends MarsHex {

    protected getTilePlacementError(tile: MarsTile): Error {
        if (!tile.canBePlacedOnLand) {
            return Error(this.createTilePlacementErrorMessage(tile))
        } else {
            return super.getTilePlacementError(tile)
        }
    }

    name(): string {
        return "land"
    }
}

export class WaterHex extends MarsHex {
    protected getTilePlacementError(tile: MarsTile): Error {
        if (!tile.canBePlacedOnWater()) {
            return new Error(this.createTilePlacementErrorMessage(tile))
        } else {
            return super.getTilePlacementError(tile)
        }
    }

    name(): string {
        return "water"
    }
}

export class NoctisCityHex extends MarsHex {  
    protected getTilePlacementError(tile: MarsTile): Error {
        return new Error(this.createTilePlacementErrorMessage(tile))
    }

    name(): string {
        return "Noctis city"
    }
}