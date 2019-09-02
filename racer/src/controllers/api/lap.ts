import { AsyncHandler } from './../../utils/async';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../interfaces/controller';
import { Racer } from '../../models/racer';
import { LapMessageI } from '../../interfaces/racer';
import { Lap } from '../../models/lap';

export class LapController implements Controller {
	public path = '/lap';
	public router = express.Router();

	constructor() {
		this.initialize();
	}

	public initialize(): void {
		this.router.post('/collect/:lapId', AsyncHandler(this.collect.bind(this)));
		this.router.post('/stop', AsyncHandler(this.stop.bind(this)));
	}

	private async collect(req: Request, res: Response, next: NextFunction): Promise<Response> {
		const lapId = +req.params.lapId;
		const data: LapMessageI[] = req.body;
		const racer: Racer = req.body.racer;

		delete req.body.racer
		// print received lap message
		console.log(req.body);

		// stop running laps
		if (racer.laps.size != 0)
			await racer.stopRunningLap(lapId);

		// start new lap to racer
		const newLap = await racer.startNewLap(lapId, data);

		try {
			await racer.readyForRun(newLap);
		} catch (err) {
			throw err;
		}

		return res.sendStatus(200);
	}

	private async stop(req: Request, res: Response, next: NextFunction): Promise<any> {
		const racer: Racer = req.body.racer;

		delete req.body.racer
		console.log(`stop racer ${racer.id}`);

		const currentLap = racer.getCurrentLap();
		if (currentLap)
			if (typeof currentLap.run != 'number')
				if (currentLap.run)
					clearInterval(currentLap.run);


		for (let [i, lap] of racer.laps) {
			if (lap)
				console.log(`racer ${racer.id} lap ${i} - `, lap.message);
		}

		return Promise.resolve(process.exit());
	}
}