import "mocha";
import * as should from "should";
import { LandHex } from "../../src/mars/hexes/LandHex";
import { NoctisCityHex } from "../../src/mars/hexes/NoctisCityHex";
import { WaterHex } from "../../src/mars/hexes/WaterHex";
import { CityTile } from "../../src/mars/tiles/CityTile";
import { GreeneryTile } from "../../src/mars/tiles/GreeneryTile";

describe("LandHex", () => {

    let landHex: LandHex;

    beforeEach(() => {
        landHex = new LandHex();
    });

    describe("when tile is placed on land", () => {
        it("and tile is a city then tile can be placed", () => {
            const cityTile: CityTile = new CityTile();
            landHex.canTileBePlaced(cityTile).should.be.true();
            landHex.placeTile(cityTile);
            landHex.getTile().should.be.equal(cityTile);
        });

        it("and tile is greenery then tile can be placed", () => {
            const greeneryTile: GreeneryTile = new GreeneryTile();
            landHex.canTileBePlaced(greeneryTile).should.be.true();
            landHex.placeTile(greeneryTile);
            landHex.getTile().should.be.equal(greeneryTile);
        });

        it("and another tile is placed then second tile cannot be placed", () => {
            const cityTile = new CityTile();
            const greeneryTile = new GreeneryTile();
            landHex.canTileBePlaced(cityTile).should.be.true();
            landHex.placeTile(cityTile);
            landHex.canTileBePlaced(greeneryTile).should.be.false();
            should(() => landHex.placeTile(greeneryTile)).throw("tile already placed");
        });
    });
});

describe("WaterHex", () => {
    let waterHex: WaterHex;

    beforeEach(() => {
        waterHex = new WaterHex();
    });
    describe("when tile is placed on water", () => {
        it("and tile is a city then tile cannot be placed", () => {
            const cityTile: CityTile = new CityTile();
            waterHex.canTileBePlaced(cityTile).should.be.false();
            should(() => waterHex.placeTile(cityTile)).throw("Cannot place a city on water");
        });

        it("and tile is a greenery then tile cannot be placed", () => {
            const greeneryTile: GreeneryTile = new GreeneryTile();
            waterHex.canTileBePlaced(greeneryTile).should.be.false();
            should(() => waterHex.placeTile(greeneryTile)).throw("Cannot place a greenery on water");
        });
    });
});

describe("NoctisCityHex", () => {
    let noctisCityHex: NoctisCityHex;

    beforeEach(() => {
        noctisCityHex = new NoctisCityHex();
    });

    describe("when a tile is placed on Noctis city reserved hex", () => {
        it("and tile is a city then tile cannot be placed", () => {
            const cityTile: CityTile = new CityTile();
            noctisCityHex.canTileBePlaced(cityTile).should.be.false();
            should(() => noctisCityHex.placeTile(cityTile)).throw("Cannot place a city on Noctis city");
        });

        it("and tile is a greenery then tile cannot be placed", () => {
            const greeneryTile: GreeneryTile = new GreeneryTile();
            noctisCityHex.canTileBePlaced(greeneryTile).should.be.false();
            should(() => noctisCityHex.placeTile(greeneryTile)).throw("Cannot place a greenery on Noctis city");
        });
    });
});
