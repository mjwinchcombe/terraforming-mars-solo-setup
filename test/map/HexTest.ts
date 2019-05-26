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
    })
    
    describe("when connecting tiles", () => {
        let hexToConnect: Hex<Tile>

        beforeEach(() => {
            hexToConnect = new Hex()
        })

        it("then a tile be can connect to middle right", () => {
            hex.connectHex(hexToConnect, HexEdges.MIDDLE_RIGHT)

            hex.connectedAt(HexEdges.MIDDLE_RIGHT).should.equal(hexToConnect)
            hexToConnect.connectedAt(HexEdges.MIDDLE_LEFT).should.equal(hex)
        })

        it("then a tile be can connect to bottom right", () => {
            hex.connectHex(hexToConnect, HexEdges.BOTTOM_RIGHT)

            hex.connectedAt(HexEdges.BOTTOM_RIGHT).should.equal(hexToConnect)
            hexToConnect.connectedAt(HexEdges.TOP_LEFT).should.equal(hex)
        })

        it("then a tile be can connect to bottom left", () => {
            hex.connectHex(hexToConnect, HexEdges.BOTTOM_LEFT)

            hex.connectedAt(HexEdges.BOTTOM_LEFT).should.equal(hexToConnect)
            hexToConnect.connectedAt(HexEdges.TOP_RIGHT).should.equal(hex)
        })

        it("then a tile be can connect to middle left", () => {
            hex.connectHex(hexToConnect, HexEdges.MIDDLE_LEFT)

            hex.connectedAt(HexEdges.MIDDLE_LEFT).should.equal(hexToConnect)
            hexToConnect.connectedAt(HexEdges.MIDDLE_RIGHT).should.equal(hex)
        })

        it("then a tile be can connect to top left", () => {
            hex.connectHex(hexToConnect, HexEdges.TOP_LEFT)

            hex.connectedAt(HexEdges.TOP_LEFT).should.equal(hexToConnect)
            hexToConnect.connectedAt(HexEdges.BOTTOM_RIGHT).should.equal(hex)
        })

        it("then a tile be can connect to top right", () => {
            hex.connectHex(hexToConnect, HexEdges.TOP_RIGHT)

            hex.connectedAt(HexEdges.TOP_RIGHT).should.equal(hexToConnect)
            hexToConnect.connectedAt(HexEdges.BOTTOM_LEFT).should.equal(hex)
        })
    })

    it ("when getting an unconnected tile then exception throw", () => {
        should(() => hex.connectedAt(HexEdges.TOP_LEFT)).throw("No hex connected to edge TOP_LEFT");
    });
})
