import { Tile } from "../map/Tile";

export abstract class MarsTile extends Tile {
    abstract canBePlacedOnWater(): boolean
    abstract canBePlacedOnLand(): boolean
    abstract name(): string
}

export class CityTile extends MarsTile{
    canBePlacedOnWater(): boolean {
        return false
    }    
    
    canBePlacedOnLand(): boolean {
        return true
    }

    name(): string {
        return "city"
    }
}

export class GreeneryTile extends MarsTile {
    canBePlacedOnWater(): boolean {
        return false
    }    
    
    canBePlacedOnLand(): boolean {
        return true  
    }

    name(): string {
        return "greenery"
    }
}