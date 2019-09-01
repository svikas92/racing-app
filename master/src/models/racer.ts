import { RacerI, PosMessage } from "../interfaces/racer";

export class Racer implements RacerI {
    private _id: number;
    private _lastPosition?: PosMessage;

    constructor(id: number) {
        this._id = id;
    }

    /**
     * get id of racer
     */
    get id() {
        return this._id;
    }

    /**
     * get id of racer
     */
    get lastPosition() {
        return this._lastPosition;
    }

    informRacer(data: any) {
        setInterval(() => {
            console.log(this._id, data);
        }, 1000);
    }
}