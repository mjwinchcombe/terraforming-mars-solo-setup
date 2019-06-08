import { MarsMap } from "./MarsMaps";
import { CityTile } from "./MarsTiles";
import { MarsHex } from "./MarsHexes";
import { HexEdges } from "../map/Hex";

abstract class CityHexFinder {
    private currentHex: MarsHex
    
    constructor(readonly map: MarsMap, readonly hexEdgeToTry: HexEdges) {
        this.currentHex = this.getStartingHex()
    }

    protected abstract getStartingHex()

    findHexForCity(city: CityTile, targetHexCount: number): MarsHex {
        let currentHexCount = 0
        do {
            if (this.currentHex.canTileBePlaced(city)) {
                currentHexCount++
            }
            if (currentHexCount != targetHexCount) {
                this.updateCurrentHexToNextHex()
            }
            
        } while (currentHexCount != targetHexCount)
        return this.currentHex
    }

    private updateCurrentHexToNextHex(): void {
        if(this.currentHex.isHexConnectedAt(this.hexEdgeToTry)) {
            this.currentHex = <MarsHex> this.currentHex.getHexConnectedAt(this.hexEdgeToTry)
        } else {
            this.currentHex = this.getHexFromNextRow()
        }
    }

    protected abstract getHexFromNextRow(): MarsHex
}

class FirstCityHexFinder extends CityHexFinder {
    private currentMapRow: number
    constructor(readonly map: MarsMap) {
        super(map, HexEdges.MIDDLE_RIGHT)
        this.currentMapRow = 0
    }
    
    protected getStartingHex() {
        return this.map.getTopLeftHex()
    }

    protected getHexFromNextRow(): MarsHex {
        try {
            this.currentMapRow++
            return this.map.getFirstHexInRow(this.currentMapRow)
        } catch (e) {
            this.currentMapRow = 0
            return this.map.getFirstHexInRow(this.currentMapRow)
        }
    }
}

class SecondCityHexFinder extends CityHexFinder {
    private currentMapRow: number
    constructor(readonly map: MarsMap) {
        super(map, HexEdges.MIDDLE_LEFT)
        this.currentMapRow = map.getLastRowNumber()
    }
    
    protected getStartingHex() {
        return this.map.getBottomRightHex()
    }

    protected getHexFromNextRow(): MarsHex {
        try {
            this.currentMapRow--
            return this.map.getLastHexInRow(this.currentMapRow)
        } catch (e) {
            this.currentMapRow = this.map.getLastRowNumber()
            return this.map.getLastHexInRow(this.currentMapRow)
        }
    }
}

export class SoloSetupCityPlacement {
    constructor(readonly map: MarsMap) {
    }

    placeFirstCity(city: CityTile, hexCount: number): MarsHex {
        let hexFinder = new FirstCityHexFinder(this.map)
        let hexForCity = hexFinder.findHexForCity(city, hexCount)
        hexForCity.placeTile(city)
        return hexForCity
    }

    placeSecondCity(city: CityTile, hexCount: number): MarsHex {
        let hexFinder = new SecondCityHexFinder(this.map)
        let hexForCity = hexFinder.findHexForCity(city, hexCount)
        hexForCity.placeTile(city)
        return hexForCity
    }
}