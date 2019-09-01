import { HttpServer } from "../interfaces/server";
import { Router, RequestHandler, NextFunction, Response, Request, } from "express";
import express from 'express';
import { Controller } from "../interfaces/controller";
import { CONTROLLERS } from './../controllers/index';

export class ApiServer implements HttpServer {
    private _app: express.Application;
	private _router: Router;

    constructor() {
        this._app = express();
        this._router = express.Router();
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
     * init script
     */

    async init() {
        //initialize middlewares
        this.initializeMiddlewares();


        //initialize routes
        this.initializeRoutes(CONTROLLERS);
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
      * nout found middleware
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