import { Racer } from "./racer";
import { PosMessage, PosI } from "../interfaces/racer";

export class Pos implements PosI {
    private _x: number;
    private _y: number;
    private _actualTime: number;
    private _expectedTime?: number;
    private _racer: Racer;

    constructor(position: PosMessage, racer: Racer) {
        this._x = position.x;
        this._y = position.y;

        this._actualTime = Date.now();
        this._racer = racer;
    }

    /**
     * get x cordinate of pos
     */

    get x() {
        return this._x;
    }

    /**
     * set x cordinate of pos
     */

    set x(x: number) {
        this._x = x;
    }

    /**
     * get y cordinate of pos
     */
    get y(){
        return this._y;
    }

    /**
     * set y cordinate of pos
     */

    set y(y: number) {
        this._y = y;
    }

    /**
     * get y cordinate of pos
     */
    get actualTime(){
        return this._actualTime;
    }

    /**
     * get y cordinate of pos
     */
    get expectedTime() {
        return this._expectedTime;
    }

    /**
     * set y cordinate of pos
     */

    set expectedTime(time) {
        this._expectedTime = time;
    }

    /**
     * get y cordinate of pos
     */
    get racer() {
        return this._racer;
    }

    /**
     * set y cordinate of pos
     */

    set racer(racer: Racer) {
        this._racer = racer;
    }
}