import { FastifyRequest, FastifyReply } from 'fastify';
import { get, controller } from './decorators';

@controller('/')
export class HealthController {
	@get('')
	async root(req: FastifyRequest, res: FastifyReply): Promise<void> {
		res.send({ status: true });
	}
}
