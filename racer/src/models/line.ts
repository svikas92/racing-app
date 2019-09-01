import { LineI, PointI } from "../interfaces/racer";
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

      /**
       * get intersecion point with given line
       */

       getIntersectionPoint(anotherLine: Line): PointI {
           const x = (anotherLine.c - this.c) / (this.m - anotherLine.m);
           const y = this.getY(x);

           return {x, y};
       }

       /**
        * get y cordinate of the point on the line given x
        */

        getY(x: number) {
            return this.m * x + this.c;
        }
}