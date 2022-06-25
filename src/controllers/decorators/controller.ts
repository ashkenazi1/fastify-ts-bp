import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { FastifyReply, FastifyError } from 'fastify';
import { RequestWithBody } from '../../interfaces';

function bodyValidators(
	keys: string
): (
	req: RequestWithBody,
	res: FastifyReply,
	done: (err?: FastifyError) => void
) => FastifyReply | undefined {
	return function (req: RequestWithBody, res: FastifyReply, done: (err?: FastifyError) => void) {
		if (!keys.length) {
			done();
			return;
		}

		if (!req.body) {
			return res.code(422).send('Invalid request');
		}

		for (let key of keys) {
			if (!req.body[key]) {
				return res.code(400).send(`Missing propery ${key}`);
			}
		}

		done();
	};
}

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();
		for (let key in target.prototype) {
			const routeHandler = target.prototype[key];
			const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
			const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
			const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
			const requiredBodyProps =
				Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];

			const validator = bodyValidators(requiredBodyProps);

			router[method](`${routePrefix}${path}`, {
				preHandler: [...middlewares, validator],
				handler: routeHandler,
			});
		}
	};
}
