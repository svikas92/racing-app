import { MasterI, LapMessageI } from "../interfaces/racer";
import { Racer } from "./racer";
import { Lap } from "./lap";

export class Master implements MasterI {
    private _racers: Map<number, Racer>;
    private _laps: Map<number, Lap>;

    constructor() {
        this._racers = new Map();
        this._laps = new Map();
    }

    /**
     * get racers
     */

     get racers() {
         return this._racers;
     }

     /**
      * get racer by id
      */

    getRacerById(id: number) {
        if (!this.racers.has(id))
            throw new Error(`invalid racer id - ${id} !`);
        
        return this.racers.get(id);
    }

     /**
      * add new racer
      */

    addRacer(racer: Racer) {
        if (this.racers.has(racer.id))
            throw new Error(`racer with id ${racer.id} already exists!`);
        
        this.racers.set(racer.id, racer);
        return this;
    }

    /**
     * get all laps
     */

    get laps() {
        return this._laps;
    }

    /**
     * lap count
     */

    getLapCount() {
        return this.laps.size;
    }

    /**
     * get racer count
     */

    getRacerCount() {
        return this.racers.size;
    }

    /**
     * run new racer
     */

    runNewRacer() {
        const newRacer = new Racer(this.getRacerCount() + 1, +`400${this.getRacerCount()}`);
        this.racers.set(newRacer.id, newRacer);

        return newRacer;
    }
    
    /**
     * initialize new lap
     */

    beginNewLap() {
        const data: LapMessageI[] = [];

        for (let [id, racer] of this.racers) {
            const newLineParams: LapMessageI = {
                m: this.generateInteger(),
                c: this.generateInteger()
            }

            data.push(newLineParams);
        }

        return this._addNewLap(data);
    }
    
    /**
     * add new lap
     */
    
    private _addNewLap(data: LapMessageI[]) {
        const newLap = new Lap(this.getLapCount() + 1, data);
         
        this.laps.set(newLap.id, newLap);
        return newLap;
     }

    /**
     * get random slope and constant for all racers
     */

     generateInteger() {
         const random = this._genRandom(0, 1000);
         const flag = Math.round(Math.random());

         if (flag)
            return random;
        else
            return -random;
     }

     /**
      * get a random interger between range (boundary included)
      * @param min 
      * @param max 
      */

     private _genRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }
}