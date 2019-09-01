import { MasterI, LapMessageI } from "../interfaces/racer";
import { Racer } from "./racer";
import { Lap } from "./lap";

export class Master implements MasterI {
    private _racers: Map<number, Racer>;
    private _laps: Map<number, Lap>;
    private _hasStopped = false;

    constructor() {
        this._racers = new Map();
        this._laps = new Map();
    }

    /**
     * 
     * @param racer has stopped
     */
    get hasStopped() {
        return this._hasStopped;
    }

    /**
     * check if should begin new lap
     */

     canStartNewLap(racer: Racer) {
         let can = false;
         const currentRacer = this._racers.get(racer.id);

         if (!currentRacer)
            return false;

         for (let [id, racer] of this.racers) {
             if (!racer.lastPosition || currentRacer.id == id)
                continue;
            
            if (!racer)
                continue;

            const distance = racer.getDistance(currentRacer);
            console.log('distance', distance);
            if (distance > 10) {
                can = true;
                break;
            }
         }

         return can;
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
        const racer = this.racers.get(id);

        if (!racer)
            throw new Error(`invalid racer id - ${id} !`);
        
        return racer;
    }

     /**
      * get lap by id
      */

     getLapById(id: number) {
         const lap = this.laps.get(id);

        if (!lap)
            throw new Error(`invalid lap id - ${id} !`);
        
        return lap;
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
     * notify racers of new lap
     */

    async notifyRacers(lap: Lap) {
        const promises: any[] = [];

        for (let [id, racer] of this.racers) {
            promises.push(racer.informRacer(lap));
        }


        try {
            await Promise.all(promises);
        } catch (err) {
            throw err;
        }
    }

    /**
     * notify racers of new lap
     */

    async stopRacers() {
        const promises: any[] = [];

        for (let [id, racer] of this.racers) {
            promises.push(racer.stopRacer());
        }

        for(let [i, lap] of this.laps){
            if (lap)
                if (lap.end) {
                    const data: any[] = [];
                    lap.notifications.forEach((value) => data.push(value.diff/value.count));
                    
                    console.log([i, lap.message, lap.end - lap.start, ...data])
                }
        }
        
        try {
            await Promise.all(promises);
        } catch (err) {
            Promise.resolve(process.exit());
            // console.log('nice la')
            // throw err;
        }
        
        Promise.resolve(process.exit());
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

    async beginNewLap() {
        const data: LapMessageI[] = [];

        if (this.laps.size == 10) {
            this._hasStopped = true;
            await this.stopRacers();
        }

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
         const random = this._genRandom(0, 5);
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