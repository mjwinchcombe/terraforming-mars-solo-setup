import { Tile } from "../map/Tile";

export abstract class MarsTile extends Tile {
    public abstract canBePlacedOnWater(): boolean;
    public abstract canBePlacedOnLand(): boolean;
    public abstract name(): string;
}
