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
}