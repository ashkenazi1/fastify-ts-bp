import {FastifyInstance, FastifyPluginOptions} from "fastify";
import fp from "fastify-plugin";
import {MongoDB} from '../models/mongo';

export default fp(async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    await MongoDB.getCollection(options.db, options.collection)
})