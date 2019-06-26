import { MarsTile } from "../MarsTile";

export class GreeneryTile extends MarsTile {
    public canBePlacedOnWater(): boolean {
        return false;
    }

    public canBePlacedOnLand(): boolean {
        return true;
    }

    public name(): string {
        return "greenery";
    }
}
