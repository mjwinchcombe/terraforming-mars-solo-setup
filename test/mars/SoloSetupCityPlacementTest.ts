import "mocha"
import "should"
import { SoloSetupCityPlacement } from "../../src/mars/SoloSetupCityPlacement";
import { Hex } from "../../src/map/Hex";
import { MarsTile, CityTile } from "../../src/mars/MarsTiles";
import { LandHex, WaterHex, MarsHex } from "../../src/mars/MarsHexes";
import { MarsMap } from "../../src/mars/MarsMaps";

describe("SoloSetupCityPlacement", () => {
    const cityTile = new CityTile()

    describe("when initialised with a map", () => {
        let soloSetupCityPlacement: SoloSetupCityPlacement
        let map: MarsMap

        beforeEach(() => {
            let topRow = [new LandHex(), new WaterHex, new LandHex()]
            let middleRow = [new LandHex(), new LandHex, new LandHex(), new LandHex()]
            let bottomRow = [new WaterHex(), new WaterHex, new LandHex()]
            let hexes: MarsHex[][] = []
            hexes[0] = topRow
            hexes[1] = middleRow
            hexes[2] = bottomRow
            map = new MarsMap(hexes);
            soloSetupCityPlacement = new SoloSetupCityPlacement(map)
        })

        describe("and first city is placed", () => {
            it("and first city placed for count 1 then top left hex contains the city", ()=> {
                soloSetupCityPlacement.placeFirstCity(cityTile, 1)
                let hexThatShouldContainCity = map.getTopLeftHex()
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
            })
    
            it("and count would put city on water then city should be placed on next availble land hex", ()=> {
                soloSetupCityPlacement.placeFirstCity(cityTile, 2)
                let hexThatShouldContainCity = map.getHexAt(0, 2)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
            })
    
            it("and count would place a city on the middle row then hex 1, 0 contains the city", () => {
                soloSetupCityPlacement.placeFirstCity(cityTile, 3)
                let hexThatShouldContainCity = map.getHexAt(1, 0)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile) 
            })
    
            it("and count is 8 then placement will wrap round and city will be placed at 0, 0", () => {
                soloSetupCityPlacement.placeFirstCity(cityTile, 8)
                let hexThatShouldContainCity = map.getHexAt(0, 0)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile) 
            })
        })
        
        describe("and second city is placed", () => {
            it("and count is 1 then bottom right hex contains the city", ()=> {
                soloSetupCityPlacement.placeSecondCity(cityTile, 1)
                let hexThatShouldContainCity = map.getBottomRightHex()
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
            })
    
            it("and count would put city on water then city should be placed on next availble land hex", ()=> {
                soloSetupCityPlacement.placeSecondCity(cityTile, 2)
                let hexThatShouldContainCity = map.getHexAt(1, 3)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
            })
    
            it("and count is 8 then placement will wrap round and city will be placed at bottom right", () => {
                soloSetupCityPlacement.placeSecondCity(cityTile, 8)
                let hexThatShouldContainCity = map.getBottomRightHex()
                hexThatShouldContainCity.getTile().should.be.equal(cityTile) 
            })
        })
    })
})