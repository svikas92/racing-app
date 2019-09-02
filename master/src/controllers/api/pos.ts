import { AsyncHandler } from '../../utils/async';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { Controller } from '../../interfaces/controller';
import { BodyData } from '../../interfaces/racer';
import { Master } from '../../models/master';

export class PosController implements Controller {
	public path = '/pos';
	public router = express.Router();

	constructor() {
		this.initialize();
	}

	public initialize(): void {
		this.router.post('/collect/:racerId', AsyncHandler(this.collect.bind(this)));
	}

	private async collect(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const data: BodyData = req.body;
		const racerId = +req.params.racerId;
		const master: Master = req.body.master;

		delete req.body.master;
		// if (!master.hasStopped)
		console.log(racerId, req.body);

		const runningLap = master.getLapById(data.lapId);
		const racer = master.getRacerById(racerId);

		runningLap.addNotification(data.point, racer);

		if (await master.canStartNewLap(runningLap)) {

			runningLap.complete();

			if (master.getLapCount() == 10) {
				await master.stopRacers();
			} else {
				const newLap = await master.beginNewLap();

				if (!newLap)
					return res.sendStatus(200);

				await master.notifyRacers(newLap);
			}

		}

		return res.status(200).send('ping!');
	}
}