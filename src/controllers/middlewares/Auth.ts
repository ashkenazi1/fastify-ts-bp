import { FastifyReply, FastifyError } from 'fastify';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../../interfaces';
import {APP_SECRET} from "../../config";

export const checkJWT = (
	req: RequestWithUser,
	res: FastifyReply,
	next: (err?: FastifyError) => void
): FastifyReply | undefined => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) {
		return res.code(400).send({ error: true });
	}

	jwt.verify(token, APP_SECRET, (err: any, user: any) => {
		if (err) return res.code(400).send({ error: true });
		req.user = user;
		next();
	});
};
