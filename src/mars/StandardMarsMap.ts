import { HexagonalMap } from "../map/HexagonalMap";
import { MarsTile } from "./MarsTiles";
import { LandHex, WaterHex, NoctisCityHex } from "./MarsHexes";

export class StandardMarsMap extends HexagonalMap<MarsTile> {
    constructor() {
        super([[new LandHex(), new WaterHex(),new LandHex(), new WaterHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new LandHex(),  new LandHex(), new LandHex(), new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new NoctisCityHex(), new WaterHex(), new WaterHex(), new WaterHex(), new LandHex(), new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex(), new WaterHex(), new WaterHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(),  new LandHex(), new LandHex()],
        [new LandHex(), new LandHex(), new LandHex(), new LandHex(), new WaterHex()]
    ])
}
    
}