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
		const selfRacerData = this.notifications.get(racer.id);

		if (!selfRacerData) {
			this.notifications.set(racer.id, Object.assign({}, {
				diff: Math.abs(this._start + 50 - Date.now()),
				count: 1,
				queue: [],
				active: position
			}))
		} else {
			if (selfRacerData.active)
				this.notifications.set(racer.id, Object.assign({}, {
					diff: selfRacerData.diff,
					count: selfRacerData.count,
					// active: selfRacerData.queue[0] || selfRacerData.active,
					queue: [...selfRacerData.queue, position]
				}));
			else {
				this.notifications.set(racer.id, Object.assign({}, {
					diff: selfRacerData.diff,
					count: selfRacerData.count,
					active: position,
					queue: []
				}));
			}
		}
	}

	/**
	 * exit lap
	 */

	complete() {
		this._end = Date.now();
	}
}