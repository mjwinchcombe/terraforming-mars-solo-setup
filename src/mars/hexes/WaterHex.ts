import { MarsHex } from "../MarsHex";
import { MarsTile } from "../MarsTile";

export class WaterHex extends MarsHex {
    protected getTilePlacementError(tile: MarsTile): Error {
        if (!tile.canBePlacedOnWater()) {
            return new Error(this.createTilePlacementErrorMessage(tile));
        } else {
            return super.getTilePlacementError(tile);
        }
    }

    public name(): string {
        return "water";
    }
}
