import {FastifyReply, FastifyRequest} from 'fastify';
import {bodyValidator, controller, post} from './decorators';
import {loginSchema, registrationSchema} from "../validationSchemas";
import bcrypt from 'bcryptjs';
import {login, register} from "../db";
import jwt from "jsonwebtoken";
import {APP_SECRET} from "../config";
import {LoginUser, RegUser} from "../interfaces";
import {authService} from "../services";

@controller('/auth')
export class AuthController {
    @post('/register')
    @bodyValidator('username', 'email', 'password', 'repeat_password')
    async registerUser(req: FastifyRequest, res: FastifyReply): Promise<void> {
        try {
            const body: RegUser = await registrationSchema.validateAsync(req.body);
            if (body) {
                const {status, result} = await authService.register(body)
                status ?
                    res.status(200).send({status: true, result}) :
                    res.status(403).send({status: false})
            } else
                res.status(422).send();
        } catch (err: any) {
            res.send(err);
        }
    }

    @post('/login')
    @bodyValidator('email', 'password')
    async loginUser(req: FastifyRequest, res: FastifyReply): Promise<void> {
        try {
            const body: LoginUser = await loginSchema.validateAsync(req.body);
            if (body) {
                const {status, result} = await authService.login(body)
                status ?
                    res.status(200).send({status: true, result}) :
                    res.status(403).send({status: false})
            } else
                res.status(422).send();
        } catch (err: any) {
            res.status(500).send(err.message);
        }
    }
}
