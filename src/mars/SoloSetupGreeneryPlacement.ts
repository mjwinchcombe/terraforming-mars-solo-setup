import { HexEdges } from "../map/Hex";
import { MarsHex } from "./MarsHex";
import { GreeneryTile } from "./tiles/GreeneryTile";

export class SoloSetupGreeneryPlacement {
    public readonly SOURROUNDING_HEX_COUNT: number = 5;
    public readonly STARTING_HEX = HexEdges.TOP_LEFT;
    public readonly ENDING_HEX = HexEdges.MIDDLE_LEFT;
    private currentPosition = this.STARTING_HEX;
    private cityHex: MarsHex;
    private count: number;

    public placeGreenery(cityHex: MarsHex, count: number) {
        this.cityHex = cityHex;
        this.count = count;
        this.validateInput();
        this.discoverHexForGreenery();
        this.placeGreeneryAtCurrentPosition();
    }

    private validateInput() {
        this.checkInitialCountIsGreaterThanZero();
        this.checkCityHexContainsCity();
        this.checkGreeneryBePlacedAroundCity();
    }

    private checkInitialCountIsGreaterThanZero(): void {
        if (this.count < 1) {
            throw Error("count must be greater than 0");
        }
    }

    private checkCityHexContainsCity(): void {
        if (!this.cityHex) {
            throw Error("city hex must be provided");
        }
        const tile = this.cityHex.getTile();
        if (!tile || tile.name() !== "city") {
            throw Error("city hex must contain a city");
        }
    }

    private checkGreeneryBePlacedAroundCity(): void {
        for (let hexPosition = this.STARTING_HEX; hexPosition <= this.ENDING_HEX; hexPosition++) {
            if (this.canGreeneryBePlacedAtPosition(hexPosition)) {
                return;
            }
        }
        throw Error("Greenery cannot be placed around this city");
    }

    private discoverHexForGreenery() {
        while (true) {
            if (this.canGreeneryBePlacedAtPosition(this.currentPosition)) {
                this.count--;
            }
            if (this.count !== 0) {
                this.incrementCurrentPosition();
            } else {
                break;
            }
        }
    }

    private canGreeneryBePlacedAtPosition(position: HexEdges): boolean {
        try {
            const hex = this.cityHex.getHexConnectedAt(position) as MarsHex;
            return hex.canTileBePlaced(new GreeneryTile());
        } catch (e) {
            return false;
        }
    }

    private incrementCurrentPosition(): void {
        this.currentPosition++;
        if (this.currentPosition >= this.ENDING_HEX) {
            this.currentPosition = this.STARTING_HEX;
        }
    }

    private placeGreeneryAtCurrentPosition(): void {
        const hexForGreenery = this.cityHex.getHexConnectedAt(this.currentPosition);
        hexForGreenery.placeTile(new GreeneryTile());
    }
}
