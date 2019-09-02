import { RacerI, PointI } from "../interfaces/racer";
import { Lap } from "./lap";
import request = require('request-promise-native');


export class Racer implements RacerI {
	private _id: number;
	private _port: number;
	private _lastPosition?: PointI;

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
	 * set racer last position
	 */

	set lastPosition(position) {
		this._lastPosition = position;
	}

	/**
	 * get distance from another racer
	 */

	getDistance(anotherRacer: Racer) {
		const selfLoc = this.lastPosition;
		const anotherLoc = anotherRacer.lastPosition;

		if (!selfLoc || !anotherLoc)
			throw new Error('invalid location');

		const distance = Math.pow(anotherLoc.x - selfLoc.x, 2) + Math.pow(anotherLoc.y - selfLoc.y, 2);
		return Math.sqrt(distance);
	}

	/**
	 * inform racer of the lap
	 * @param lap
	 */

	async informRacer(lap: Lap) {
		return request({
			method: 'POST',
			uri: `http://localhost:${this.port}/api/lap/collect/${lap.id}`,
			body: lap.message,
			json: true
		});
	}

	/**
	 * stop racer
	 */

	async stopRacer() {
		return request({
			method: 'POST',
			uri: `http://localhost:${this.port}/api/lap/stop`,
			body: {},
			json: true
		})
	}
}