import { LapI, LapMessageI } from "../interfaces/racer";

export class Lap implements LapI {
    private _id: number;
    private _message: LapMessageI[];

    constructor(id: number, message: LapMessageI[]) {
        this._id = id;
        this._message = message;
    }

    /**
     * get lap id
     */

     get id() {
         return this._id;
     }

     /**
      * get lap message
      */
     get message() {
         return this._message;
     }
}