import {RegUser, LoginUser, LogicResult} from '../interfaces';
import bcrypt from 'bcryptjs';
import {MongoDB} from '../models/mongo'
import {DB} from "../config"


export const register = async (user: RegUser): Promise<{ success: boolean; result: any }> => {
    try {
        const col = await MongoDB.getCollection(DB, "users")
        const res = await col.insertOne({
            'username': user.username,
            'email': user.email,
            'password': user.password
        });
        if (res.acknowledged) return {success: true, result: res.insertedId}
        return {success: false, result: undefined};
    } catch (err: any) {
        return {success: false, result: err};
    }
};

export const login = async (
    login: LoginUser
): Promise<{ status: boolean; result: string | undefined }> => {
    try {
        const col = await MongoDB.getCollection(DB, "users")
        const user = await col.findOne({email: login.email})

        if (user) {
            return {
                status: bcrypt.compareSync(login.password, user.password),
                result: user.username,
            };
        }
        return {
            status: false,
            result: 'invalid login',
        };
    } catch (err: any) {
        return {
            status: false,
            result: err.message,
        };
    }
};

export const getByUserID = async (id: number): Promise<LogicResult> => {
    try {
        const col = await MongoDB.getCollection(DB, "users")
        const user = await col.findOne({_id: id})

        return {status: true, result: user}
    } catch (err: any) {
        return {status: false, result: err};
    }
};

export const getByUserEmail = async (email: string): Promise<LogicResult> => {
    try {
        const col = await MongoDB.getCollection(DB, "users")
        const user = await col.findOne({email: email})
        return {status: true, result: user}
    } catch (err: any) {
        return {status: false, result: err};
    }
};
