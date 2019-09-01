import 'reflect-metadata';
import { ApiServer } from './src/server/index';

const server = new ApiServer(2);
server.init()
	.then(() => server.start(4001))
	.catch((err) => console.log(err));