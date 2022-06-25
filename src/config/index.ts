import * as env from 'env-var';

export const PORT: number = env.get('PORT').required().asIntPositive();
export const MONGO_URL: string = env.get('MONGO_URL').required().asString();
export const DB: string = env.get('DB').required().asString();
export const IS_DEV: boolean = env.get('IS_DEV').required().asBool();
export const APP_SECRET: string = env.get('APP_SECRET').asString() || "v65789ufvcew687uht37ewufd"
