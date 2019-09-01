import { LapI, LapMessageI, PosI, PosMessage } from "../interfaces/racer";

export class Lap implements LapI {
    private _id: number;
    private _message: LapMessageI[];
    private _start: number;
    private _end?: number;
    private _notifications: Map<number, PosI[]>;

    constructor(id: number, message: LapMessageI[]) {
        this._id = id;
        this._message = message;
        this._start = Date.now();
        this._notifications = new Map();
    }

    /**
     * get id
     */

    get id() {
        return this._id;
    }

    /**
     * get message
     */

     get message() {
         return this._message;
     }

     /**
      * get start time
      */

    get start() {
        return this._start;
    }

    /**
     * get notifications
     */

    get notifications() {
        return this._notifications;
    }
    
    /**
     * add notification
     */

     addNotification(pos: PosMessage) {

     }
}