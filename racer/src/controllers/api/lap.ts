import { AsyncHandler } from './../../utils/async';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../interfaces/controller';

export class LapController implements Controller {
	public path = '/lap';
	public router = express.Router();

	constructor() {
		this.initialize();
	}

	public initialize(): void {
		this.router.post('/collect', AsyncHandler(this.collect.bind(this)));
	}

	private async collect(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.status(200).send('ping!');
	}
}