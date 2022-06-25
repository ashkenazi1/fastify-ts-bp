import Fastify, { FastifyInstance } from 'fastify';
import {IS_DEV} from './config'

export class AppRouter {
	private static instance: FastifyInstance;

	static getInstance(): FastifyInstance {
		if (!this.instance)
			AppRouter.instance = Fastify({
				logger: IS_DEV,
			});
		return AppRouter.instance;
	}
}
