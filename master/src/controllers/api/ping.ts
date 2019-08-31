import { AsyncHandler } from './../../utils/async';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../interfaces/controller';

export class PingController implements Controller {
	public path = '/ping';
	public router = express.Router();

	constructor() {
		this.initialize();
	}

	public initialize(): void {
		this.router.get('/', AsyncHandler(this.ping.bind(this)));
	}

	private async ping(req: Request, res: Response, next: NextFunction): Promise<Response> {
		return res.status(200).send('ping!');
	}
}