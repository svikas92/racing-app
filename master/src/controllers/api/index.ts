import { Controller } from './../../interfaces/controller';
import * as express from 'express';
import { PingController } from './ping';
import { PosController } from './pos';

export class ApiController implements Controller {
	public path = '/api';
	public router = express.Router();
	private controllers: Controller[] = [];

	constructor() {
		this.controllers.push(
            new PingController(),
            new PosController()
		);
		this.initialize();
	}

	initialize() {
		this.controllers.map((controller) => this.router.use(controller.path, controller.router));
	}
}