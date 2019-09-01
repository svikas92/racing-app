import 'reflect-metadata';
import { ApiServer } from './src/server/index';

const server = new ApiServer(1);
server.init()
	.then(() => server.start(4000))
	.catch((err) => console.log(err));