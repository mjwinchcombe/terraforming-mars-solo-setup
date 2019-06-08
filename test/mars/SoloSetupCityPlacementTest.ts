import "mocha"
import "should"
import { SoloSetupCityPlacement } from "../../src/mars/SoloSetupCityPlacement";
import { CityTile } from "../../src/mars/MarsTiles";
import { LandHex, WaterHex, MarsHex } from "../../src/mars/MarsHexes";
import { MarsMap } from "../../src/mars/MarsMaps";
import { buildMarsMapFromString } from "../../src/mars/MarsMapFromStringFactory";

describe("SoloSetupCityPlacement", () => {
    const cityTile = new CityTile()

    describe("when initialised with a map", () => {
        let soloSetupCityPlacement: SoloSetupCityPlacement
        let map: MarsMap

        beforeEach(() => {
            map = buildMarsMapFromString(
                ` L W L
                 L L L L
                  W W L`)
            soloSetupCityPlacement = new SoloSetupCityPlacement(map)
        })

        describe("and first city is placed", () => {
            it("and first city placed for count 1 then top left hex contains the city", ()=> {
                let cityHex = soloSetupCityPlacement.placeFirstCity(cityTile, 1)
                let hexThatShouldContainCity = map.getTopLeftHex()
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity)
            })
    
            it("and count would put city on water then city should be placed on next availble land hex", ()=> {
                let cityHex = soloSetupCityPlacement.placeFirstCity(cityTile, 2)
                let hexThatShouldContainCity = map.getHexAt(0, 2)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity)
            })
    
            it("and count would place a city on the middle row then hex 1, 0 contains the city", () => {
                let cityHex = soloSetupCityPlacement.placeFirstCity(cityTile, 3)
                let hexThatShouldContainCity = map.getHexAt(1, 0)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity) 
            })
    
            it("and count is 8 then placement will wrap round and city will be placed at 0, 0", () => {
                let cityHex = soloSetupCityPlacement.placeFirstCity(cityTile, 8)
                let hexThatShouldContainCity = map.getHexAt(0, 0)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity) 
            })
        })
        
        describe("and second city is placed", () => {
            it("and count is 1 then bottom right hex contains the city", ()=> {
                let cityHex = soloSetupCityPlacement.placeSecondCity(cityTile, 1)
                let hexThatShouldContainCity = map.getBottomRightHex()
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity)
            })
    
            it("and count would put city on water then city should be placed on next availble land hex", ()=> {
                let cityHex = soloSetupCityPlacement.placeSecondCity(cityTile, 2)
                let hexThatShouldContainCity = map.getHexAt(1, 3)
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity)
            })
    
            it("and count is 8 then placement will wrap round and city will be placed at bottom right", () => {
                let cityHex = soloSetupCityPlacement.placeSecondCity(cityTile, 8)
                let hexThatShouldContainCity = map.getBottomRightHex()
                hexThatShouldContainCity.getTile().should.be.equal(cityTile)
                cityHex.should.equal(hexThatShouldContainCity) 
            })
        })

        describe("given first city placed is already palced", () => {

            beforeEach(() => {
                soloSetupCityPlacement.placeFirstCity(cityTile, 2)
            })

            it("when trying to place city on the same hex then city is placed on next available hex", () => {
                soloSetupCityPlacement.placeSecondCity(new CityTile(), 6)
                map.getHexAt(0, 2).getTile().should.be.instanceOf(CityTile)
                map.getHexAt(0, 0).getTile().should.be.instanceOf(CityTile)
             })
        })
    })
})