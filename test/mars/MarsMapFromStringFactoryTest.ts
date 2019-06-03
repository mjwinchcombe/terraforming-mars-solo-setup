import "mocha"
import * as should from "should"
import { buildMarsMapFromString } from "../../src/mars/MarsMapFromStringFactory";

describe("MarsMapFromStringFactory", () => {

    describe("when given a string defining a single hex", () => {
        
        it("and string defines a LandHex then map containing single LandHex is created", () =>{
            let mapString = "L"
            let map = buildMarsMapFromString(mapString)
            map.getLastRowNumber().should.be.equal(0)
            map.getHexAt(0, 0).name().should.be.equal("land")
        })
        
        it("and string defines a WaterHex then map containing single WaterHex is created", () =>{
            let mapString = "W"
            let map = buildMarsMapFromString(mapString)
            map.getLastRowNumber().should.be.equal(0)
            map.getHexAt(0, 0).name().should.be.equal("water")
        })

        it("and string defines a NoctisCityHex then map containing single NoctisCityHex is created", () =>{
            let mapString = "N"
            let map = buildMarsMapFromString(mapString)
            map.getLastRowNumber().should.be.equal(0)
            map.getHexAt(0, 0).name().should.be.equal("Noctis city")
        })

        it("and string defines a LandHex with city tile then map contains a single LandHex with a city", () => {
            let mapString = "C"
            let map = buildMarsMapFromString(mapString)
            map.getLastRowNumber().should.be.equal(0)
            let hex = map.getHexAt(0, 0)
            hex.name().should.be.equal("land")
            hex.getTile().name().should.be.equal("city")
        })

        it("and string defines a valid hex and contains whitepace then map containing single hex is created", () => {
            let mapString = " L\t"
            let map = buildMarsMapFromString(mapString)
            map.getLastRowNumber().should.be.equal(0)
            map.getHexAt(0, 0).name().should.be.equal("land")
        })
    })

    describe("when string defines a multirow map", () => {

        let mapString = ` L L 
                         L C W
                          W N `
        let map = buildMarsMapFromString(mapString)

        it("then map contains multiple rows", () => {
            map.getLastRowNumber().should.be.equal(2)
        })

        it("that map contains the expected hexes", () => {
            map.getHexAt(0, 0).name().should.be.equal("land")
            map.getHexAt(0, 1).name().should.be.equal("land")
            map.getHexAt(1, 0).name().should.be.equal("land")
            map.getHexAt(1, 1).name().should.be.equal("land")
            map.getHexAt(1, 2).name().should.be.equal("water")
            map.getHexAt(2, 0).name().should.be.equal("water")
            map.getHexAt(2, 1).name().should.be.equal("Noctis city")
        })
    })

    describe("when string defines invalid map", () => {
        describe("by having a following row more than one hex bigger", () => {
            let mapString = `  L L
                             C C C C`
            it("then error is thrown", () => {
                should(() => buildMarsMapFromString(mapString)).throw("Map layout is not "
                    + "hexagonal expect row 1 to contain 3 hexes not 4")
            })
        })

        describe("by having decreasing before increasing again", () => {
            let mapString = ` L L L
                               W W
                              L L L`
            it("then error is thrown", () => {
                should(() => buildMarsMapFromString(mapString)).throw("Map layout is not hexagonal "
                    + "the length of rows cannot increase again after decreasing. "
                    + "Row 1 has 2 hexes, Row 2 has 3 hexes")
            })
        })
    })
})