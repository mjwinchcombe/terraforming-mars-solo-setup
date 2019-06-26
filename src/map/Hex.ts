import { Tile } from "./Tile";

export enum HexEdges {
    TOP_LEFT,
    TOP_RIGHT,
    MIDDLE_RIGHT,
    BOTTOM_RIGHT,
    BOTTOM_LEFT,
    MIDDLE_LEFT,
}

const OPPOSITE_EDGES: HexEdges[] = (() => {
    const res: HexEdges[] = [];
    res[HexEdges.TOP_LEFT] = HexEdges.BOTTOM_RIGHT;
    res[HexEdges.TOP_RIGHT] = HexEdges.BOTTOM_LEFT;
    res[HexEdges.MIDDLE_RIGHT] = HexEdges.MIDDLE_LEFT;
    res[HexEdges.BOTTOM_RIGHT] = HexEdges.TOP_LEFT;
    res[HexEdges.BOTTOM_LEFT] = HexEdges.TOP_RIGHT;
    res[HexEdges.MIDDLE_LEFT] = HexEdges.MIDDLE_RIGHT;
    return res;
})();

export class Hex<T extends Tile> {
    private tile: T;
    private connectedHexes: Array<Hex<T>> = [];

    public placeTile(tile: T) {
        const placementError = this.getTilePlacementError(tile);
        if (placementError) {
            throw placementError;
        }
        this.tile = tile;
    }

    public canTileBePlaced(tile: T): boolean {
        return !this.getTilePlacementError(tile);
    }

    protected getTilePlacementError(tile: T): Error {
        if (this.tile) {
            return Error("tile already placed");
        }
        return null;
    }

    public getTile(): T {
        return this.tile;
    }

    public connectHex(hex: Hex<T>, edge: HexEdges): void {
        this.connectedHexes[edge] = hex;
        hex.connectedHexes[OPPOSITE_EDGES[edge]] = this;
    }

    public getHexConnectedAt(edge: HexEdges): Hex<T> {
        const hex = this.connectedHexes[edge];
        if (!hex) {
            throw Error("No hex connected to edge " + HexEdges[edge]);
        }
        return hex;
    }

    public isHexConnectedAt(edge: HexEdges): boolean {
        const hex = this.connectedHexes[edge];
        if (hex) {
            return true;
        }
        return false;
    }
}
