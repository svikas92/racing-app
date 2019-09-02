import { Line } from './line';
import { LapI, LapMessageI } from "../interfaces/racer";

export class Lap implements LapI {
	private _id: number;
	private _message: LapMessageI[];
	private _run?: NodeJS.Timeout | number;
	private _line?: Line;
	private _x?: number;
	private _y?: number;


	constructor(id: number, message: LapMessageI[]) {
		this._id = id;
		this._message = message;
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
	 * get current x cordinate
	 */

	set x(x) {
		this._x = x;
	}

	/**
	 * get current y cordinate
	 */
	set y(y) {
		this._y = y;
	}

	get run() {
		return this._run;
	}

	set run(run) {
		this._run = run;
	}

	get line() {
		return this._line;
	}

	set line(line) {
		this._line = line;
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