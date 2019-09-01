import 'reflect-metadata';
import { ApiServer } from './src/server/index';

const server = new ApiServer();
server.init()
	.then(() => server.start(4002))
	.catch((err) => console.log(err));