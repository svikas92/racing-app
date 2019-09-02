import { RequestHandler, Request, Response, NextFunction } from 'express';

class AsyncWrap {
	static getHandler(handler: RequestHandler): RequestHandler {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				await handler(req, res, next);
			}
			catch (ex) {
				// console.log(ex.message);
				return res.status(400).send(ex);
			}
		}
	}
}
export const AsyncHandler = AsyncWrap.getHandler;