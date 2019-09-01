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
		this.router.post('/collect/:lapId', AsyncHandler(this.collect.bind(this)));
	}

	private async collect(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const lapId = req.params.lapId;
        const data = req.body;

        console.log(data);

		return res.status(200).send('ping!');
	}
}