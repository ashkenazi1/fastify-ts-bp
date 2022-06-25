import { FastifyRequest } from 'fastify';

export interface RequestWithBody extends FastifyRequest {
	body: { [x: string]: any };
}

export interface RequestWithUser extends FastifyRequest {
	user?: any;
}

export interface RegUser {
	username: string;
	email: string;
	password: string;
}

export interface LoginUser {
	email: string;
	password: string;
}

export interface LogicResult{
	status: boolean;
	result: any;
}
