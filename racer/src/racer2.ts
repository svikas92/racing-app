import 'reflect-metadata';
import { ApiServer } from './server';

const server = new ApiServer(2);
server.init()
	.then(() => server.start(9002))
	.catch((err) => console.log(err));