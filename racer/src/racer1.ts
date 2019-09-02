import 'reflect-metadata';
import { ApiServer } from './server/index';

const server = new ApiServer(1);
server.init()
	.then(() => server.start(9001))
	.catch((err) => console.log(err));