import {Tile} from "./Tile"

export enum HexEdges {
    TOP_LEFT,
    TOP_RIGHT,
    MIDDLE_RIGHT,
    BOTTOM_RIGHT,
    BOTTOM_LEFT,
    MIDDLE_LEFT
}

const OPPOSITE_EDGES: HexEdges[] = function() {
    let res: HexEdges[] = []
    res[HexEdges.TOP_LEFT] = HexEdges.BOTTOM_RIGHT
    res[HexEdges.TOP_RIGHT] = HexEdges.BOTTOM_LEFT
    res[HexEdges.MIDDLE_RIGHT] = HexEdges.MIDDLE_LEFT
    res[HexEdges.BOTTOM_RIGHT] = HexEdges.TOP_LEFT
    res[HexEdges.BOTTOM_LEFT] = HexEdges.TOP_RIGHT
    res[HexEdges.MIDDLE_LEFT] = HexEdges.MIDDLE_RIGHT
    return res
}()

export class Hex<T extends Tile> {
    private _tile: T
    private _connectedHexes: Hex<T>[] = []   
    
    constructor() {
    }

    placeTile(tile: T) {
        let placementError = this.getTilePlacementError(tile)
        if (placementError) {
            throw placementError
        }
        this._tile = tile
    }

    canTileBePlaced(tile: T): boolean {
        return !this.getTilePlacementError(tile)
    }

    protected getTilePlacementError(tile: T): Error {
        if (this._tile) {
            return Error("tile already placed") 
        }
        return null
    }

    getTile(): T {
        return this._tile
    }

    connectHex(hex: Hex<T>, edge: HexEdges): void {
        this._connectedHexes[edge] = hex
        hex._connectedHexes[OPPOSITE_EDGES[edge]] = this
    }

    getHexConnectedAt(edge: HexEdges): Hex<T> {
        let hex = this._connectedHexes[edge]
        if (!hex) {
            throw Error("No hex connected to edge " + HexEdges[edge])
        }
        return hex; 
    }

    isHexConnectedAt(edge: HexEdges): boolean {
        let hex = this._connectedHexes[edge]
        if (hex) {
            return true;
        }
        return false
    }
}
