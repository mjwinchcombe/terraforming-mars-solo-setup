import { SoloSetup } from "../../src/mars/SoloSetup";
import { MarsMap } from "../../src/mars/MarsMaps";
import { buildMarsMapFromString } from "../../src/mars/MarsMapFromStringFactory";
import * as should from "should"

describe("Solo Setup", () => {

    describe("given setting up a solo game", () => {
        let map: MarsMap

        beforeEach(() => {
            map = buildMarsMapFromString(
                ` L L 
                 L L L
                  L L`)
        })

        it("then a map can be specified", () => {
            SoloSetup().withMap(map)
        })

        it("then a card value can be specified", () => {
            SoloSetup().addCardValue(10)
        })

        it("then map and cards values can be chained", () => {
            SoloSetup()
                .withMap(map)
                .addCardValue(5)
        })

        it("when card values but no map specified then error is thrown", () => {
            should(() => SoloSetup()
                .addCardValue(5)
                .addCardValue(9)
                .addCardValue(23)
                .addCardValue(5)
                .setup()).throw("A map must be specified")
        })

        it("when a map is speficied but less than 4 card values the error is thrown", () => {
            should(() => SoloSetup()
                .withMap(map)
                .addCardValue(1)
                .addCardValue(2)
                .addCardValue(3)
                .setup()).throw("4 card values must be specified")
        })

        it("when more than 4 card values are added then an error is thrown", () => {
            should(() => SoloSetup()
                .withMap(map)
                .addCardValue(1)
                .addCardValue(2)
                .addCardValue(3)
                .addCardValue(4)
                .addCardValue(5)).throw("Maximum of 4 card values allowed")
        })

        it("when a map and 4 card values specified then map is setup", () => {
            let setupMap = SoloSetup()
                .withMap(map)
                .addCardValue(1)
                .addCardValue(2)
                .addCardValue(3)
                .addCardValue(4)
                .setup()

            should.exist(setupMap)
            setupMap.getHexAt(1, 0).getTile().name().should.be.equal("city")
            setupMap.getHexAt(2, 0).getTile().name().should.be.equal("greenery")
            setupMap.getHexAt(1, 1).getTile().name().should.be.equal("city")
            setupMap.getHexAt(0, 1).getTile().name().should.be.equal("greenery")
        })
    })
})