import { LandHex } from "./hexes/LandHex";
import { NoctisCityHex } from "./hexes/NoctisCityHex";
import { WaterHex } from "./hexes/WaterHex";
import { MarsHex } from "./MarsHex";
import { MarsMap } from "./MarsMaps";
import { CityTile } from "./tiles/CityTile";

/**
 * Builds a mars map from a string.  Each character in the string represents a
 * single hex.  Characters are mapped as follows:
 * L = LandHex
 * W = WaterHex
 * N = NoctisCityHex
 * C = LandHex with city tile
 * A new line represents a new row of hexes in the map
 * @param mapString The string to build the map from
 */
export function buildMarsMapFromString(mapString: string): MarsMap {
    const builder = new MarsMapFromStringBuilder(mapString);
    return builder.build();
}

class MarsMapFromStringBuilder {
    private hexes: MarsHex[][];
    private currentRow: MarsHex[];

    constructor(readonly mapString: string) {
        this.hexes = [];
    }

    public build(): MarsMap {
        this.currentRow = [];
        for (const char of this.mapString) {
            const hex = this.getHexForChar(char);
            if (hex) {
                this.currentRow.push(hex);
            }
        }
        this.hexes.push(this.currentRow);
        return new MarsMap(this.hexes);
    }

    private getHexForChar(char: string) {
        if (char === "\n") {
            this.hexes.push(this.currentRow);
            this.currentRow = [];
        }
        if (this.isWhitespace(char)) {
            // Don't return null
            return null;
        }
        switch (char) {
            case "L":
                return new LandHex();
            case "W":
                return new WaterHex();
            case "N":
                return new NoctisCityHex();
            case "C":
                const landHex = new LandHex();
                landHex.placeTile(new CityTile());
                return landHex;
            default:
                throw Error(`Unknown hex type '${char}'`);
        }
    }

    private isWhitespace(char: string): boolean {
        return /\s/.test(char);
    }
}
