import 'reflect-metadata';
import { ApiServer } from './src/server/index';

const server = new ApiServer();
server.init()
	.then(() => server.start(3000))
	.catch((err) => console.log(err));