import { Router } from 'express';

export interface HttpServer {
	router: Router;
	app: Express.Application;
	init(): void;
}