import { FastifyReply, FastifyError } from 'fastify';
import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestWithUser } from '../../interfaces';

export function use(
	middleware: (
		req: RequestWithUser,
		res: FastifyReply,
		next: (err?: FastifyError | undefined) => void
	) => FastifyReply | undefined
) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

		Reflect.defineMetadata(MetadataKeys.middleware, [...middlewares, middleware], target, key);
	};
}
