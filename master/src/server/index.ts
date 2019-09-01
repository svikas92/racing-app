import { HttpServer } from "../interfaces/server";
import { Router, RequestHandler, NextFunction, Response, Request, } from "express";
import express from 'express';
import { Controller } from "../interfaces/controller";
import { CONTROLLERS } from './../controllers/index';
import { Racer } from "../models/racer";
import { Lap } from "../models/lap";
import { Master } from "../models/master";

export class ApiServer implements HttpServer {
    private _app: express.Application;
    private _router: Router;

    private _master: Master;

    constructor() {
        this._app = express();
        this._router = express.Router();
        this._master = new Master();
    }

    /**
     * get api server router
     */

    get router() {
        return this._router;
    }

    /**
     * get express app instance
     */

    get app() {
        return this._app;
    }

    /**
     * get master
     */

    get master() {
        return this._master;
    }

    /**
     * init script
     */

    async init() {
        //initialize middlewares
        this.initializeMiddlewares();


        //initialize routes
        this.initializeRoutes(CONTROLLERS);

        //initialize racers
        await this.runTheRace();
    }

    /**
     * middleware init function
     * */

    initializeMiddlewares() {
        this._app.use(express.json());
    }

    /**
     * mount routes
     */

     initializeRoutes(controllers: Controller[]) {
         // mount controller with their respective path and router
         controllers.map((controller) => this._app.use(controller.path, controller.router));

         // mount all routers to app instance
		this._app.use('/', this._router);

		// handle not found routes
		this._router.all('*', this.notFound().bind(this));
     }

     /**
      * initialize racers
      */

    async runTheRace() {
        const master = this.master;
        const racer1 = master.runNewRacer();
        const racer2 = master.runNewRacer();

        setInterval(async () => {
            const newLap = master.beginNewLap();
            await racer1.informRacer(newLap);
            await racer2.informRacer(newLap);
        }, 1000);
    }


     /**
      * not found middleware
      */

     private notFound(): RequestHandler {
		return (req: Request, res: Response, next: express.NextFunction) => {
			console.log(`${req.method} 404 Not Found, ${req.path}`);
			return res.status(404).send({
				msg: 'Not found!'
			});
		};
    }
    
    /**
     * start the server on given port
     * @param port
     */
    
    public start(port: number) {
		this.app.listen(port, () => console.log(`server is running on port ${port}`));
	}
}