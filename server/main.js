const fastify = require('fastify')
const plugins = require('./plugin')
const config = require('config')
const database = require('./helper/helper-database-selector')

// Endpoints
const contentService = require('./service/service-content')

const initialize = () => {
    try {
        const serverConfig = config.get('server')
        const server = fastify({ logger: serverConfig.logger })
        server.decorate('config', serverConfig)
        server.decorate('database', database)
        plugins.register(server)
        server.register(contentService, { prefix: '/content' })
        server.listen(server.config.port, server.config.host)
        return server
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
module.exports = initialize()
