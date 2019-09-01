import { RacerI, PosMessage } from "../interfaces/racer";
import { Lap } from "./lap";
import request = require('request-promise-native');


export class Racer implements RacerI {
    private _id: number;
    private _port: number;
    private _lastPosition?: PosMessage;

    constructor(id: number, port: number) {
        this._id = id;
        this._port = port;
    }

    /**
     * get id of racer
     */
    get id() {
        return this._id;
    }

    /**
     * get racer running port
     */

     get port() {
         return this._port;
     }

    /**
     * get id of racer
     */
    get lastPosition() {
        return this._lastPosition;
    }

    /**
     * inform racer of the lap
     * @param lap
     */

    async informRacer(lap: Lap) {
        await request({
            method: 'POST',
            uri: `http://localhost:${this.port}/api/lap/collect/${lap.id}`,
            body: lap.message,
            json: true
        });
    }
}