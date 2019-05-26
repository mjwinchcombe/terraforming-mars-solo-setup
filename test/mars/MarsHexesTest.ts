import "mocha"
import * as should from "should"
import { LandHex, WaterHex, NoctisCityHex } from "../../src/mars/MarsHexes";
import { CityTile, GreeneryTile } from "../../src/mars/MarsTiles";

describe("LandHex", () => {

    let landHex: LandHex

    beforeEach(() => {
        landHex = new LandHex()
    })

    describe("when tile is placed on land", () => {
        it("and tile is a city then tile can be placed", () => {
            let cityTile: CityTile = new CityTile();
            landHex.canTileBePlaced(cityTile).should.be.true()
            landHex.placeTile(cityTile)
            landHex.getTile().should.be.equal(cityTile)
        })

        it("and tile is greenery then tile can be placed", () => {
            let greeneryTile: GreeneryTile = new GreeneryTile();
            landHex.canTileBePlaced(greeneryTile).should.be.true()
            landHex.placeTile(greeneryTile)
            landHex.getTile().should.be.equal(greeneryTile)
        })
    })
})

describe("WaterHex", () => {
    let waterHex: WaterHex

    beforeEach(() => {
        waterHex = new WaterHex()
    })
    describe("when tile is placed on water", () => {
        it("and tile is a city then tile cannot be placed", () => {
            let cityTile: CityTile = new CityTile();
            waterHex.canTileBePlaced(cityTile).should.be.false()
            should(() => waterHex.placeTile(cityTile)).throw("Cannot place a city on water")
        })

        it("and tile is a greenery then tile cannot be placed", () => {
            let greeneryTile: GreeneryTile = new GreeneryTile();
            waterHex.canTileBePlaced(greeneryTile).should.be.false()
            should(() => waterHex.placeTile(greeneryTile)).throw("Cannot place a greenery on water")
        })
    })
})

describe("NoctisCityHex", () => {
    let noctisCityHex: NoctisCityHex

    beforeEach(() => {
        noctisCityHex = new NoctisCityHex()
    })
    
    describe("when a tile is placed on Noctis city reserved hex", () => {
        it("and tile is a city then tile cannot be placed", () => {
            let cityTile: CityTile = new CityTile();
            noctisCityHex.canTileBePlaced(cityTile).should.be.false()
            should(() => noctisCityHex.placeTile(cityTile)).throw("Cannot place a city on Noctis city")
        })

        it("and tile is a greenery then tile cannot be placed", () => {
            let greeneryTile: GreeneryTile = new GreeneryTile();
            noctisCityHex.canTileBePlaced(greeneryTile).should.be.false()
            should(() => noctisCityHex.placeTile(greeneryTile)).throw("Cannot place a greenery on Noctis city")
        })
    })
})