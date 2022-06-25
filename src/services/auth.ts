import {LogicResult, LoginUser, RegUser} from "../interfaces";
import bcrypt from "bcryptjs";
import {getByUserEmail, login, register} from "../db";
import jwt from "jsonwebtoken";
import {APP_SECRET} from "../config";

class AuthService {

    async register(body: RegUser): Promise<LogicResult> {
        const {status, result} = await getByUserEmail(body.email)
        if (status && result.email)
            throw new Error("Registration Failed")
        body.password = bcrypt.hashSync(body.password, 8)
        const reg = await register(body);
        if (reg.success) {
            const token = jwt.sign({id: reg.result.insertId}, APP_SECRET, {
                expiresIn: 86400,
            });
            return {status: true, result: token};
        } else {
            return {status: false, result: undefined};
        }
    }

    async login(body: LoginUser): Promise<LogicResult> {
        const isLoggedIn = await login(body);
        if (isLoggedIn.status) {
            const token = jwt.sign({id: isLoggedIn.result}, APP_SECRET, {
                expiresIn: 86400,
            });
            return {status: true, result:token}
        } else {
            return {status: false, result: undefined}
        }
    }
}

export const authService = new AuthService();