import { AsyncHandler } from '../../utils/async';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
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
		if (!master.hasStopped)
			console.log(racerId, req.body);

		const lap = master.getLapById(data.lapId);
		const racer = master.getRacerById(racerId);

		lap.addNotification(data.point, racer);
		
		if (master.canStartNewLap(racer)) {
			lap.complete();
			const newLap = await master.beginNewLap();
			
			master.notifyRacers(newLap);
		}

		return res.status(200).send('ping!');
	}
}