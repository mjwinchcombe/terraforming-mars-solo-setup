import { Hex } from "../map/Hex";
import { MarsTile } from "./MarsTile";

export abstract class MarsHex extends Hex<MarsTile> {
    public abstract name(): string;

    protected createTilePlacementErrorMessage(tile: MarsTile): string {
        return `Cannot place a ${tile.name()} on ${this.name()}`;
    }
}
