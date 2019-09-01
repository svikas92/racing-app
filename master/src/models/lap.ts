import { LapI, LapMessageI, PointI, PosI } from "../interfaces/racer";
import { Racer } from "./racer";

export class Lap implements LapI {
    private _id: number;
    private _message: LapMessageI[];
    private _start: number;
    private _end?: number;
    private _notifications: Map<number, PosI>;

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
     * get end time
     */

     get end() {
         return this._end;
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

     addNotification(position: PointI, racer: Racer) {
        const data = this.notifications.get(racer.id);
        racer.lastPosition = position;

        if (!data)
            this.notifications.set(racer.id, {
                diff: (this._start + 50) - Date.now(),
                count: 1
            })
        else {
            this._notifications.set(racer.id, {
                diff: data.diff + (this._start + data.count * 50) - Date.now(),
                count: data.count + 1
            })
        }        
    }

    /**
     * exit lap
     */

     complete() {
         this._end = Date.now();

     }
}