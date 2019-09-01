import { LineI } from "../interfaces/racer";
import { Racer } from "./racer";

export class Line implements LineI {
    private _m: number;
    private _c: number;
    // private _racer: Racer;

    constructor(m: number, c: number) {
        this._m = m;
        this._c = c;
    }

    /**
     * get slope of the line
     */

     get m() {
         return this._m;
     }

     /**
      * get line constant
      */

      get c() {
          return this._c;
      }
}