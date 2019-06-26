import { SoloSetupCityPlacement } from "./cityplacement/SoloCityPlacement";
import { MarsHex } from "./MarsHex";
import { MarsMap } from "./MarsMaps";
import { SoloSetupGreeneryPlacement } from "./SoloSetupGreeneryPlacement";
import { CityTile } from "./tiles/CityTile";

export function SoloSetup() {
    return new SoloSetupBuilder();
}

class SoloSetupBuilder {

    public readonly REQUIRED_NUMBER_OF_CARD_VALUES = 4;
    private map: MarsMap;
    private cardValues: number[] = [];

    public withMap(map: MarsMap): SoloSetupBuilder {
        this.map = map;
        return this;
    }

    public addCardValue(cardValue: number): SoloSetupBuilder {
        if (this.cardValues.length < this.REQUIRED_NUMBER_OF_CARD_VALUES) {
            this.cardValues.push(cardValue);
        } else {
            throw Error(`Maximum of ${this.REQUIRED_NUMBER_OF_CARD_VALUES} card values allowed`);
        }
        return this;
    }

    public setup(): MarsMap {
        if (!this.map) {
            throw Error("A map must be specified");
        }
        if (this.cardValues.length < this.REQUIRED_NUMBER_OF_CARD_VALUES) {
            throw Error(`${this.REQUIRED_NUMBER_OF_CARD_VALUES} card values must be specified`);
        }
        const sumOfCardValues = this.sumOfCardValues();
        this.placeCities(sumOfCardValues);
        return this.map;
    }

    private sumOfCardValues(): number {
        let result = 0;
        this.cardValues.forEach((cardValue) => result += cardValue);
        return result;
    }

    private placeCities(sumOfCardValues: number): void {
        const cityPlacement = new SoloSetupCityPlacement(this.map);
        const firstCityHex = cityPlacement.placeFirstCity(new CityTile(), sumOfCardValues);
        const secondCityHex = cityPlacement.placeSecondCity(new CityTile(), sumOfCardValues);
        this.placeGreenery(firstCityHex, sumOfCardValues);
        this.placeGreenery(secondCityHex, sumOfCardValues);
    }

    private placeGreenery(cityHex: MarsHex, sumOfCardValues: number): void {
        const greeneryPlacement = new SoloSetupGreeneryPlacement();
        greeneryPlacement.placeGreenery(cityHex, sumOfCardValues);
    }
}
