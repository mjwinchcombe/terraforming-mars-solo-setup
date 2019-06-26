import "mocha";
import "should";
import { CityTile } from "../../src/mars/tiles/CityTile";
import { GreeneryTile } from "../../src/mars/tiles/GreeneryTile";

describe("CityTile", () => {
    const cityTile = new CityTile();

    it("that city tiles can be placed on land", () => {
        cityTile.canBePlacedOnLand().should.be.true();
    });

    it("that city tiles cannot be placed on water", () => {
        cityTile.canBePlacedOnWater().should.be.false()
    });

    it("that name is city", () => {
        cityTile.name().should.be.equal("city");
    });
});

describe("GreeneryTile", () => {
    const greeneryTile = new GreeneryTile();

    it("that greenery tiles can be placed on land", () => {
        greeneryTile.canBePlacedOnLand().should.be.true()
    });

    it("that greenery tiles cannot be placed on water", () => {
        greeneryTile.canBePlacedOnWater().should.be.false()
    });

    it("that name is greenery", () => {
        greeneryTile.name().should.be.equal("greenery");
    });
});