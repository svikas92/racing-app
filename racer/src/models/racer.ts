import { RacerI, PointI } from "../interfaces/racer";
import { Line } from "./line";
import { Lap } from "./lap";
import request = require('request-promise-native');

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
     * get current x cordinate
     */

     get x() {
         return this._x;
     }

     /**
      * get current y cordinate
      */
     get y() {
         return this._y;
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

     /**
      * add new lap to racer
      */

    addLap(lap: Lap) {
        if (this.laps.has(lap.id))
        throw new Error('lap already exists!');

        this.laps.set(lap.id, lap);
        this._setLine(lap);
        return this;
    }

    /**
     * set line with given lap
     */
    private _setLine(lap: Lap) {
        const lineParams = lap.message[this.id - 1];
        const selfLine = new Line(lineParams.m, lineParams.c);

        this._line = selfLine;
    }

       /**
     * print self identity
     */

    callSelf() {
        return console.log(`R${this.id}`);
    }

      /**
       * start running
       */

    readyForRun(lap: Lap) {
        const message = lap.message;
        const selfLine = this._line;

        if (!selfLine)
            throw new Error(`invalid line for the racer with id ${this.id}!`);

        const index = this.id == 2 ? 0: 1;
        const otherLineParams = message[index];
        const otherLine = new Line(otherLineParams.m, otherLineParams.c);

        const intersection = selfLine.getIntersectionPoint(otherLine);
        this.setInitialPoint(intersection);
        this.startRuning();
    }

    /**
     * set initial point
     */

     setInitialPoint(point: PointI) {
         this._x = point.x;
         this._y = point.y;
     }

      /**
       * move racer
       */

    startRuning() {
        setInterval(async() => {
            await this.moveRacer()
        }, 1000);
    }

    /**
     * move racer
     */
    async moveRacer() {
        if (!this._x)
            throw new Error('initial point not set!');

        if (!this._line)
            throw new Error('line is not set!');
            
        this._x = this._x + 1;
        this._y = this._line.getY(this._x);

        await this.informMaster();
    }

    /**
     * inform master of movement
     */

     async informMaster() {
         try {
             await request({
                 method: 'POST',
                 uri: `http://localhost:3000/api/pos/collect/${this.id}`,
                 body: {x: this._x, y: this._y},
                 json: true
             });
         } catch (err) {
             throw err;
         }
     }
}