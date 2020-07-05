const swaggerPlugin = require('./swagger')
const healthcheckPlugin = require('./health')
const helmetPlugin = require('./helmet')

const register = (fastify) => {
    fastify.register(swaggerPlugin.internals, swaggerPlugin.options)
    fastify.register(healthcheckPlugin.internals, healthcheckPlugin.options)
    fastify.register(helmetPlugin.internals, helmetPlugin.options)
}

module.exports = { register }
