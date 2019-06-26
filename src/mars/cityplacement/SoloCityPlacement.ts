import { MarsHex } from "../MarsHex";
import { MarsMap } from "../MarsMaps";
import { CityTile } from "../tiles/CityTile";
import { FirstCityHexFinder } from "./FirstCityHexFinder";
import { SecondCityHexFinder } from "./SecondCityHexFinder";

export class SoloSetupCityPlacement {
    constructor(readonly map: MarsMap) {
    }

    public placeFirstCity(city: CityTile, hexCount: number): MarsHex {
        const hexFinder = new FirstCityHexFinder(this.map);
        const hexForCity = hexFinder.findHexForCity(city, hexCount);
        hexForCity.placeTile(city);
        return hexForCity;
    }

    public placeSecondCity(city: CityTile, hexCount: number): MarsHex {
        const hexFinder = new SecondCityHexFinder(this.map);
        const hexForCity = hexFinder.findHexForCity(city, hexCount);
        hexForCity.placeTile(city);
        return hexForCity;
    }
}
