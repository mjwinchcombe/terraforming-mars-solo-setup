import "mocha"
import * as should from "should"
import { MarsMap } from "../../src/mars/MarsMaps";
import { LandHex, WaterHex, MarsHex } from "../../src/mars/MarsHexes";

describe("MarsMaps", () => {

    describe("when a 2, 3, 2 is created", () => {
        let map: MarsMap
        let topLeftHex, bottomRightHex: MarsHex
        beforeEach(() => {
            topLeftHex = new LandHex()
            bottomRightHex = new WaterHex
            let topRow = [topLeftHex, new LandHex()]
            let middleRow = [new WaterHex, new LandHex(), new WaterHex()]
            let bottomRow = [new LandHex(), bottomRightHex]
            let hexes: MarsHex[][] = []
            hexes[0] = topRow
            hexes[1] = middleRow
            hexes[2] = bottomRow
            map = new MarsMap(hexes)
        })

        describe("and getting hexes", () => {
            it("then top left hex can be got", () => {
                let topLeftHexFromMap = map.getTopLeftHex()
                topLeftHexFromMap.should.be.equal(topLeftHex)
            })
    
            it("then bottom right hex can be got", () => {
                let bottomRightHexFromMap = map.getBottomRightHex()
                bottomRightHexFromMap.should.be.equal(bottomRightHex)
            })
    
            it("then first hex in a row can be got", () => {
                let firstHexOfFirstRow = map.getFirstHexInRow(0)
                firstHexOfFirstRow.should.be.equal(topLeftHex)
            })
    
            it("then getting first hex of a row that does not exist throws error", () => {
                should(() => map.getFirstHexInRow(12)).throw("Row 12 does not exist in map")
            })

            it("then last hex in row can be got", () => {
                let lastHexInRow = map.getLastHexInRow(2)
                lastHexInRow.should.be.equal(bottomRightHex)
            })

            it("then getting last hex of a row that does not exist throws error", () => {
                should(() => map.getFirstHexInRow(-1)).throw("Row -1 does not exist in map")
            })
        })

        describe("getting last row number", () => {
            it("then last row number is 2", () => {
                map.getLastRowNumber().should.be.equal(2)
            })
        })
        
    })
})