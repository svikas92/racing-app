import { AsyncHandler } from '../../utils/async';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../interfaces/controller';
import { PosMessage } from '../../interfaces/racer';

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
		const data: PosMessage = req.body;
		const racerId = req.params.racerId;
		const master = req.body.master;

		delete req.body.master;
		console.log(req.body);

		return res.status(200).send('ping!');
	}
}