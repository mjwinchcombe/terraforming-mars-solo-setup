import "mocha";
import * as should from "should";
import { HexEdges } from "../../src/map/Hex";
import { LandHex } from "../../src/mars/hexes/LandHex";
import { buildMarsMapFromString } from "../../src/mars/MarsMapFromStringFactory";
import { MarsMap } from "../../src/mars/MarsMaps";
import { SoloSetupGreeneryPlacement } from "../../src/mars/SoloSetupGreeneryPlacement";
import { GreeneryTile } from "../../src/mars/tiles/GreeneryTile";

describe("SoloSetupGreeneryPlacement", () => {

    let map: MarsMap;
    let greeneryPlacement: SoloSetupGreeneryPlacement;
    let cityHex: LandHex;

    describe("when city is surrounded by LandHexes", () => {
        const mapString =   ` L L
                             L C L
                              L L`;

        beforeEach(() => {
            map = buildMarsMapFromString(mapString);
            greeneryPlacement = new SoloSetupGreeneryPlacement();
            cityHex = map.getHexAt(1, 1) as LandHex;
        });
        it("and count is 1 then greenery is placed on top left hex", () => {
            greeneryPlacement.placeGreenery(cityHex, 1);

            const hex = cityHex.getHexConnectedAt(HexEdges.TOP_LEFT);
            hex.getTile().name().should.be.equal("greenery");
        });
        it("and count is 2 then greenery is placed on top right hex", () => {
            greeneryPlacement.placeGreenery(cityHex, 2);

            const hex = cityHex.getHexConnectedAt(HexEdges.TOP_RIGHT);
            hex.getTile().name().should.be.equal("greenery");
        });
        it("and count is 3 then greenery is placed on middle right hex", () => {
            greeneryPlacement.placeGreenery(cityHex, 3);

            const hex = cityHex.getHexConnectedAt(HexEdges.MIDDLE_RIGHT);
            hex.getTile().name().should.be.equal("greenery");
        });
        it("and count is 4 then greenery is placed on bottom right hex", () => {
            greeneryPlacement.placeGreenery(cityHex, 4);

            const hex = cityHex.getHexConnectedAt(HexEdges.BOTTOM_RIGHT);
            hex.getTile().name().should.be.equal("greenery");
        });
        it("and count is 5 then greenery is placed on bottom left hex", () => {
            greeneryPlacement.placeGreenery(cityHex, 5);

            const hex = cityHex.getHexConnectedAt(HexEdges.BOTTOM_LEFT);
            hex.getTile().name().should.be.equal("greenery");
        });
        it("and count is 6 then greenery is placed on top left hex, counting should wrap", () => {
            greeneryPlacement.placeGreenery(cityHex, 6);

            const hex = cityHex.getHexConnectedAt(HexEdges.TOP_LEFT);
            hex.getTile().name().should.be.equal("greenery");
        });
        it("and count is 37 then greenery is placed on top right hex, counting should wrap", () => {
            greeneryPlacement.placeGreenery(cityHex, 37);

            const hex = cityHex.getHexConnectedAt(HexEdges.TOP_RIGHT);
            hex.getTile().name().should.be.equal("greenery");
        });
    });

    describe("when city is has a hex where greenery cannot be placed next to it", () => {
        const mapString =   ` W L
                             L C L
                              L N`;
        const COUNT_FOR_WATER_HEX = 1;
        const COUNT_FOR_NOCTIS_CITY_HEX = 3;
        beforeEach(() => {
            map = buildMarsMapFromString(mapString);
            greeneryPlacement = new SoloSetupGreeneryPlacement();
            cityHex = map.getHexAt(1, 1) as LandHex;
        });

        it("and count would place greenery on water then next available hex (clockwise) is used", () => {
            greeneryPlacement.placeGreenery(cityHex, COUNT_FOR_WATER_HEX);

            const hex = cityHex.getHexConnectedAt(HexEdges.TOP_RIGHT);
            hex.getTile().name().should.be.equal("greenery");
        });

        it("and count would place greenery on noctis city hex then greenery is place on bottom left", () => {
            greeneryPlacement.placeGreenery(cityHex, COUNT_FOR_NOCTIS_CITY_HEX);

            const hex = cityHex.getHexConnectedAt(HexEdges.BOTTOM_LEFT);
            hex.getTile().name().should.be.equal("greenery");
        });
    });

    describe("when a city is surrounded by hexes where greenery cannot be placed", () => {
        const mapString =   ` W W
                             W C W
                              W W`;
        beforeEach(() => {
            map = buildMarsMapFromString(mapString);
            greeneryPlacement = new SoloSetupGreeneryPlacement();
            cityHex = <LandHex> map.getHexAt(1, 1);
        });

        it("then an error is thrown", () => {
            should(() => greeneryPlacement.placeGreenery(cityHex, 1))
                .throw("Greenery cannot be placed around this city");
        });
    });

    describe("when a city is next to the edge of the map", () => {
        const mapString =   ` L W
                             C L L
                              L W`;
        beforeEach(() => {
            map = buildMarsMapFromString(mapString);
            greeneryPlacement = new SoloSetupGreeneryPlacement();
            cityHex = map.getHexAt(1, 0) as LandHex;
        });

        it("and greenery would be placed off the map then the next available hex is used", () => {
            greeneryPlacement.placeGreenery(cityHex, 4);

            const hex = cityHex.getHexConnectedAt(HexEdges.TOP_RIGHT);
            hex.getTile().name().should.be.equal("greenery");
        });
    });

    describe("when invalid input provided,", () => {
        const mapString =   ` L N
                             C L L
                              L L`;
        beforeEach(() => {
            map = buildMarsMapFromString(mapString);
            greeneryPlacement = new SoloSetupGreeneryPlacement();
            cityHex = map.getHexAt(1, 0) as LandHex;
        });

        it("count value is 0 then error thrown", () => {
            should(() => greeneryPlacement.placeGreenery(cityHex, 0))
                .throw("count must be greater than 0");
        });

        it("city hex is empty then error is thrown", () => {
            const hexWithoutCity = map.getHexAt(0, 0) as LandHex;
            should(() => greeneryPlacement.placeGreenery(hexWithoutCity, 1))
                .throw("city hex must contain a city");
        });

        it("city hex doesn't contain city then error is thrown", () => {
            const hex = map.getHexAt(0, 0) as LandHex;
            hex.placeTile(new GreeneryTile());
            should(() => greeneryPlacement.placeGreenery(hex, 1))
                .throw("city hex must contain a city");
        });

        it("city hex doesn't exist then error is thrown", () => {
            let hex;
            should(() => greeneryPlacement.placeGreenery(hex, 1))
                .throw("city hex must be provided");
        });
    });
});