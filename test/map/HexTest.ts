import { Hex, HexEdges } from "../../src/map/Hex";

import "mocha"
import * as should from "should"
import { Tile } from "../../src/map/Tile";

describe("Hex", () => {

    let hex: Hex<Tile>
    
    beforeEach(() => {
        hex = new Hex()
    })

    describe("when placing a tile", () => {
        it("then a tile can be placed", () => {
            let tile = new Tile()
    
            hex.placeTile(tile)
    
            hex.getTile().should.equal(tile)
        })

        it("and a tile is already placed on the hex then tile cannot be placed", () => {
            let tile1 = new Tile()
            let tile2 = new Tile()
            
            hex.placeTile(tile1)
            should(() => hex.placeTile(tile2)).throw("tile already placed")
        })

        it("and a tile is already placed on the hex then canTileBePlaced returns false", () => {
            let tile1 = new Tile()
            let tile2 = new Tile()
            
            hex.placeTile(tile1)
            hex.canTileBePlaced(tile2).should.be.false()
        })
    })
    
    describe("when connecting tiles", () => {
        let hexToConnect: Hex<Tile>

        beforeEach(() => {
            hexToConnect = new Hex()
        })

        it("then a tile be can connect to middle right", () => {
            hex.connectHex(hexToConnect, HexEdges.MIDDLE_RIGHT)

            hex.isHexConnectedAt(HexEdges.MIDDLE_RIGHT).should.be.true()
            hex.getHexConnectedAt(HexEdges.MIDDLE_RIGHT).should.equal(hexToConnect)
            hexToConnect.getHexConnectedAt(HexEdges.MIDDLE_LEFT).should.equal(hex)
        })

        it("then a tile be can connect to bottom right", () => {
            hex.connectHex(hexToConnect, HexEdges.BOTTOM_RIGHT)

            hex.isHexConnectedAt(HexEdges.BOTTOM_RIGHT).should.be.true()
            hex.getHexConnectedAt(HexEdges.BOTTOM_RIGHT).should.equal(hexToConnect)
            hexToConnect.getHexConnectedAt(HexEdges.TOP_LEFT).should.equal(hex)
        })

        it("then a tile be can connect to bottom left", () => {
            hex.connectHex(hexToConnect, HexEdges.BOTTOM_LEFT)

            hex.isHexConnectedAt(HexEdges.BOTTOM_LEFT).should.be.true()
            hex.getHexConnectedAt(HexEdges.BOTTOM_LEFT).should.equal(hexToConnect)
            hexToConnect.getHexConnectedAt(HexEdges.TOP_RIGHT).should.equal(hex)
        })

        it("then a tile be can connect to middle left", () => {
            hex.connectHex(hexToConnect, HexEdges.MIDDLE_LEFT)

            hex.isHexConnectedAt(HexEdges.MIDDLE_LEFT).should.be.true()
            hex.getHexConnectedAt(HexEdges.MIDDLE_LEFT).should.equal(hexToConnect)
            hexToConnect.getHexConnectedAt(HexEdges.MIDDLE_RIGHT).should.equal(hex)
        })

        it("then a tile be can connect to top left", () => {
            hex.connectHex(hexToConnect, HexEdges.TOP_LEFT)

            hex.isHexConnectedAt(HexEdges.TOP_LEFT).should.be.true()
            hex.getHexConnectedAt(HexEdges.TOP_LEFT).should.equal(hexToConnect)
            hexToConnect.getHexConnectedAt(HexEdges.BOTTOM_RIGHT).should.equal(hex)
        })

        it("then a tile be can connect to top right", () => {
            hex.connectHex(hexToConnect, HexEdges.TOP_RIGHT)

            hex.isHexConnectedAt(HexEdges.TOP_RIGHT).should.be.true()
            hex.getHexConnectedAt(HexEdges.TOP_RIGHT).should.equal(hexToConnect)
            hexToConnect.getHexConnectedAt(HexEdges.BOTTOM_LEFT).should.equal(hex)
        })
    })

    it ("when getting an unconnected tile then exception throw", () => {
        should(() => hex.getHexConnectedAt(HexEdges.TOP_LEFT)).throw("No hex connected to edge TOP_LEFT");
    });
})
