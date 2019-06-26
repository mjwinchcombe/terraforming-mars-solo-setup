import { MarsHex } from "../MarsHex";
import { MarsTile } from "../MarsTile";

export class LandHex extends MarsHex {

    protected getTilePlacementError(tile: MarsTile): Error {
        if (!tile.canBePlacedOnLand) {
            return Error(this.createTilePlacementErrorMessage(tile));
        } else {
            return super.getTilePlacementError(tile);
        }
    }

    public name(): string {
        return "land";
    }
}
