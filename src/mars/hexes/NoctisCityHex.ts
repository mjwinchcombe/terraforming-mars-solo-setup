import { MarsHex } from "../MarsHex";
import { MarsTile } from "../MarsTile";

export class NoctisCityHex extends MarsHex {
    protected getTilePlacementError(tile: MarsTile): Error {
        return new Error(this.createTilePlacementErrorMessage(tile));
    }

    public name(): string {
        return "Noctis city";
    }
}
