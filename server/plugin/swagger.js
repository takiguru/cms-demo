const internals = require('fastify-swagger')
const packageDetails = require('../../package')

const options = (fastify) => {
    return {
        routePrefix: '/swagger',
        swagger: {
            info: {
                title: 'CMS API',
                description: 'Content Manager System demo api routes',
                version: packageDetails.version
            }
        },
        exposeRoute: fastify.config.plugins.enableSwaggerEndpoint
    }
}

module.exports = { internals, options }
