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
		console.log(req.body);

		const newLap = new Lap(lapId, data);
		racer.addLap(newLap);
		racer.readyForRun(newLap);

		return res.status(200).send('ping!');
	}

	private async stop(req: Request, res: Response, next: NextFunction): Promise<any> {
		const racer: Racer = req.body.racer;
		
		delete req.body.racer
		console.log(req.body);

		
		// process.addListener('beforeExit', () => {
		// });
		
		for (let [i, lap] of racer.laps) {
			if (lap)
				console.log(lap.message);
		}
		// process.emit('beforeExit', 123);
		process.exit()
		
		// res.sendStatus(200);
		// return res.sendStatus(200);
	}
}