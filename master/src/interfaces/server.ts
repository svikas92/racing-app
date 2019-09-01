import { Router } from 'express';
import { MasterI } from './racer';

export interface HttpServer {
	router: Router;
	app: Express.Application;
	master: MasterI
	init(): void;
}