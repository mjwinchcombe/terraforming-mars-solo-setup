import { MarsMap } from "./MarsMaps";
import { SoloSetupCityPlacement } from "./SoloSetupCityPlacement";
import { CityTile } from "./MarsTiles";
import { SoloSetupGreeneryPlacement } from "./SoloSetupGreeneryPlacement";
import { MarsHex } from "./MarsHexes";

export function SoloSetup() {
    return new SoloSetupBuilder()
}

class SoloSetupBuilder {

    readonly REQUIRED_NUMBER_OF_CARD_VALUES = 4
    private map: MarsMap
    private cardValues: number[] = []

    withMap(map: MarsMap): SoloSetupBuilder {
        this.map = map
        return this
    }

    addCardValue(cardValue: number): SoloSetupBuilder {
        if (this.cardValues.length < this.REQUIRED_NUMBER_OF_CARD_VALUES) {
            this.cardValues.push(cardValue);
        } else {
            throw Error(`Maximum of ${this.REQUIRED_NUMBER_OF_CARD_VALUES} card values allowed`)
        }
        return this
    }

    setup(): MarsMap {
        if (!this.map) {
            throw Error("A map must be specified")
        }
        if (this.cardValues.length < this.REQUIRED_NUMBER_OF_CARD_VALUES) {
            throw Error(`${this.REQUIRED_NUMBER_OF_CARD_VALUES} card values must be specified`)
        }
        let sumOfCardValues = this.sumOfCardValues()
        this.placeCities(sumOfCardValues)
        return this.map;
    }

    private sumOfCardValues(): number {
        let result = 0
        this.cardValues.forEach((cardValue) => result += cardValue)
        return result
    }
    
    private placeCities(sumOfCardValues: number): void {
        let cityPlacement = new SoloSetupCityPlacement(this.map)
        let firstCityHex = cityPlacement.placeFirstCity(new CityTile(), sumOfCardValues)
        let secondCityHex = cityPlacement.placeSecondCity(new CityTile(), sumOfCardValues)
        //Note greeneries are placed after both cities
        this.placeGreenery(firstCityHex, sumOfCardValues)
        this.placeGreenery(secondCityHex, sumOfCardValues)
    }

    private placeGreenery(cityHex: MarsHex, sumOfCardValues: number): void {
        let greeneryPlacement = new SoloSetupGreeneryPlacement()
        greeneryPlacement.placeGreenery(cityHex, sumOfCardValues)
    }
}