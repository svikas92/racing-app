import { RacerI } from "../interfaces/racer";
import { Line } from "./line";
import { Lap } from "./lap";

export class Racer implements RacerI {
    private _id: number;
    private _laps: Map<number, Lap>;
    
    private _x?: number;
    private _y?: number;
    private _line?: Line;

    constructor(id: number) {
        this._id = id;
        this._laps = new Map();
    }

    /**
     * get racer id
     */

     get id() {
         return this._id;
     }

     /**
      * get racer laps
      */

     get laps() {
         return this._laps;
     }
}