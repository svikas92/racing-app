import { Router } from 'express';
import { RacerI } from './racer';

export interface HttpServer {
	router: Router;
	app: Express.Application;
	racer: RacerI;
	init(): void;
}