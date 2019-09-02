import { RacerI, PointI, LapMessageI } from "../interfaces/racer";
import { Line } from "./line";
import { Lap } from "./lap";
import request = require('request-promise-native');

export class Racer implements RacerI {
	private _id: number;
	private _laps: Map<number, Lap>;
	private _currentLap?: Lap;

	constructor(id: number) {
		this._id = id;
		this._laps = new Map();
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
	 * get current lap
	 */

	getCurrentLap() {
		return this._currentLap;
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

		this._currentLap = lap;
		this._currentLap.line = selfLine;
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

	async readyForRun(lap: Lap) {
		const message = lap.message;
		const currentLap = this.laps.get(lap.id);

		if (!currentLap)
			throw new Error(`invalid lap for the racer with id ${this.id}!`);

		const selfLine = currentLap.line;
		if (!selfLine)
			throw new Error(`invalid line for the racer with id ${this.id}!`);

		const index = this.id == 2 ? 0 : 1;
		const otherLineParams = message[index];
		const otherLine = new Line(otherLineParams.m, otherLineParams.c);

		const intersection = selfLine.getIntersectionPoint(otherLine);

		console.log('intersection', intersection);

		if (intersection.x == -Infinity || intersection.x == Infinity || intersection.y == Infinity || intersection.x == -Infinity)
			throw new Error('found parallel lines, stopping!');

		if (selfLine.m == otherLine.m && selfLine.c == otherLine.c)
			throw new Error('found identical lines, stopping!');

		this.setInitialPoint(intersection, lap);
		await this.startRuning(lap);
	}

	/**
	 * set initial point
	 */

	setInitialPoint(point: PointI, lap: Lap) {
		lap.x = point.x;
		lap.y = point.y;
	}

	/**
	 * stop running lap
	 * @param newLapId
	 */

	async stopRunningLap(newLapId: number) {
		const lastlap = newLapId - 1;
		const lap = this._laps.get(lastlap);

		if (lap)
			if (typeof lap.run != 'number') {
				if (lap.run)
					clearInterval(lap.run);
			}

		return this;
	}

	/**
	 * start new lap with given it
	 * @param lap 
	 */

	async startNewLap(lapId: number, data: LapMessageI[]) {
		const newLap = new Lap(lapId, data);
		this.addLap(newLap);

		return newLap;
	}

	/**
	 * move racer
	 */

	async startRuning(lap: Lap) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const currentLap = this.laps.get(lap.id);
				if (currentLap)
					currentLap.run = setInterval(async () => {
						const lapId = currentLap.id;
						try {
							await this.moveRacer(lapId);
						} catch (err) {
							reject(err);
						}
					}, 50);
			});
			resolve();
		});
	}

	/**
	 * move racer
	 */
	async moveRacer(lapId: number) {
		const currentLap = this.laps.get(lapId);

		if (!currentLap)
			throw new Error('no valid lap!');

		if (currentLap.x == undefined)
			throw new Error('initial point not set!');

		if (!currentLap.line)
			throw new Error('line is not set!');

		currentLap.x = currentLap.x + 1;
		currentLap.y = currentLap.line.getY(currentLap.x);

		try {
			await this.informMaster(lapId);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * inform master of movement
	 */

	async informMaster(lapId: number) {
		const currentLap = this.laps.get(lapId);
		if (!currentLap)
			throw new Error('no valid lap!');

		try {
			await request({
				method: 'POST',
				uri: `http://localhost:3000/api/pos/collect/${this.id}`,
				body: { lapId, point: { x: currentLap.x, y: currentLap.y } },
				json: true
			});
		} catch (err) {
			throw err;
		}
	}
}