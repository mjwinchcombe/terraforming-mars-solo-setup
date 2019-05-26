import { HexagonalMap } from "../../src/map/HexagonalMap"
import { Hex, HexEdges } from "../../src/map/Hex";

import "mocha"
import * as should from "should"
import { Tile } from "../../src/map/Tile";

describe("HexagonalMap", () => {
    
    describe("when building from arrays", () => {

        it("then a map can be built from a single hex", () => {
            let hex: Hex<Tile> = new Hex();
            let hexArray: Hex<Tile>[][] = [];
            hexArray[0] = [hex]

            let map = HexagonalMap.buildFrom2dArray(hexArray)
            map.getHexAt(0, 0).should.equal(hex)
        })

        describe("and hexes describe a single row map", () => {
            let hexes: Hex<Tile>[][]
            let leftHex, middleHex, rightHex: Hex<Tile>

            beforeEach(() => {
                hexes = [];
                hexes[0] = [new Hex(), new Hex(), new Hex()]
                let map = HexagonalMap.buildFrom2dArray(hexes);
                leftHex = map.getHexAt(0, 0)
                middleHex = map.getHexAt(0, 1)
                rightHex = map.getHexAt(0, 2)
            })

            it("then left hex is connected to middle hex", () => {
                leftHex.connectedAt(HexEdges.MIDDLE_RIGHT).should.equal(middleHex)
            })

            it("then middle hex is connected to left and right hexes", () => {
                middleHex.connectedAt(HexEdges.MIDDLE_LEFT).should.equal(leftHex)
                middleHex.connectedAt(HexEdges.MIDDLE_RIGHT).should.equal(rightHex)
            })

            it("that right hex is connected to middle hex", () => {
                rightHex.connectedAt(HexEdges.MIDDLE_LEFT).should.equal(middleHex)
            })
        })

        describe("and hexes describe a 1, 2 map", () => {
            let hexes: Hex<Tile>[][]
            let topHex, middleLeftHex, middleRightHex: Hex<Tile>
            
            beforeEach(() => {
                hexes = [];
                let topRow = [new Hex()]
                let middleRow = [new Hex(), new Hex()]
                hexes[0] = topRow
                hexes[1] = middleRow
                let map = HexagonalMap.buildFrom2dArray(hexes)
                topHex = map.getHexAt(0, 0)
                middleLeftHex = map.getHexAt(1, 0)
                middleRightHex = map.getHexAt(1, 1)
            })

            it("then top hex is connected to both middle hexes", () => {
                topHex.connectedAt(HexEdges.BOTTOM_LEFT).should.equal(middleLeftHex)
                topHex.connectedAt(HexEdges.BOTTOM_RIGHT).should.equal(middleRightHex)
            })

            it("then both middle hexes are connected to top hex", () => {
                middleLeftHex.connectedAt(HexEdges.TOP_RIGHT).should.equal(topHex)
                middleRightHex.connectedAt(HexEdges.TOP_LEFT).should.equal(topHex)
            })
        })
    }) 

    describe("and hexes describe a 1, 2, 1 map", () => {
        let hexes: Hex<Tile>[][]
        let topHex, middleLeftHex, middleRightHex, bottomHex: Hex<Tile>
        
        beforeEach(() => {
            hexes = [];
            let topRow = [new Hex()]
            let middleRow = [new Hex(), new Hex()]
            let bottomRow = [new Hex()]
            hexes[0] = topRow
            hexes[1] = middleRow
            hexes[2] = bottomRow
            let map = HexagonalMap.buildFrom2dArray(hexes)
            topHex = map.getHexAt(0, 0)
            middleLeftHex = map.getHexAt(1, 0)
            middleRightHex = map.getHexAt(1, 1)
            bottomHex = map.getHexAt(2, 0)
        })

        it("then top hex is connected to both middle hexes", () => {
            topHex.connectedAt(HexEdges.BOTTOM_LEFT).should.equal(middleLeftHex)
            topHex.connectedAt(HexEdges.BOTTOM_RIGHT).should.equal(middleRightHex)
        })

        it("then both middle hexes are connected to top and bottom hexes", () => {
            middleLeftHex.connectedAt(HexEdges.TOP_RIGHT).should.equal(topHex)
            middleLeftHex.connectedAt(HexEdges.BOTTOM_RIGHT).should.equal(bottomHex)
            middleRightHex.connectedAt(HexEdges.TOP_LEFT).should.equal(topHex)
            middleRightHex.connectedAt(HexEdges.BOTTOM_LEFT).should.equal(bottomHex)
        })
    })

    describe("and hexes describe a 2, 1 map", () => {
        let hexes: Hex<Tile>[][]
        let topLeftHex, topRightHex, bottomHex: Hex<Tile>
        
        beforeEach(() => {
            hexes = [];
            let topRow = [new Hex(), new Hex()]
            let bottomRow = [new Hex()]
            hexes[0] = topRow
            hexes[1] = bottomRow            
            let map = HexagonalMap.buildFrom2dArray(hexes)
            topLeftHex = map.getHexAt(0, 0)
            topRightHex = map.getHexAt(0, 1)
            bottomHex = map.getHexAt(1, 0)
        })

        it("then both top hexes are connected to the bottom hex", () => {
            topLeftHex.connectedAt(HexEdges.BOTTOM_RIGHT).should.equal(bottomHex)
            topRightHex.connectedAt(HexEdges.BOTTOM_LEFT).should.equal(bottomHex)
        })
    })

    describe("and hexes describe a non-hexagonal map (1, 3)", () => {
        it("then an exception is thrown", () => {
            let hexes: Hex<Tile>[][] = []
            let topRow = [new Hex()]
            let middleRow = [new Hex(), new Hex(), new Hex()]
            hexes[0] = topRow
            hexes[1] = middleRow
           
            should(() => HexagonalMap.buildFrom2dArray(hexes))
                .throw("Map layout is not hexagonal expect row 1 to contain 2 hexes not 3")
        })
    })

    describe("and hexes describe a non-hexagonal map (5, 4, 5)", () => {
        it("then an exception is thrown", () => {
            let hexes: Hex<Tile>[][] = []
            let topRow = [new Hex(), new Hex(), new Hex(), new Hex(), new Hex()]
            let middleRow = [new Hex(), new Hex(), new Hex(), new Hex()]
            let bottomRow = [new Hex(), new Hex(), new Hex(), new Hex(), new Hex()]
            hexes[0] = topRow
            hexes[1] = middleRow
            hexes[2] = bottomRow

            should(() => HexagonalMap.buildFrom2dArray(hexes))
                .throw("Map layout is not hexagonal the length of rows cannot increase again after decreasing."
                    + " Row 1 has 4 hexes, Row 2 has 5 hexes")
        })
    })

    describe("when getting a tile that does not exist", () => {
        let map: HexagonalMap<Tile>

        beforeEach(() => {
            let hexes: Hex<Tile>[][] = []
            hexes[0] = [new Hex()]
            map = HexagonalMap.buildFrom2dArray(hexes)
        })

        it("then exception is thrown", () => {
            should(() => map.getHexAt(1,2)).throw("No hex at row 1 column 2")
        })
    })
})