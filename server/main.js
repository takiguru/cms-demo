const fastify = require('fastify')
const plugins = require('./plugin')
const config = require('config')
const database = require('./helper/helper-database-selector')
const path = require('path')
const Bundler = require('parcel-bundler')
const entryFiles = ['./client/index.html']

// Endpoints
const contentService = require('./service/service-content')

const options = {
    outDir: './dist', // The out directory to put the build files in, defaults to dist
    outFile: 'index.html', // The name of the outputFile
    publicUrl: '/', // The url to serve on, defaults to '/'
    watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
    target: 'browser', // Browser/node/electron, defaults to browser
    logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors, 0 = log nothing
    sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
    detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
}

function clientBundler (server) {
    const bundler = new Bundler(entryFiles, options)
    bundler.bundle()
    server.register(require('fastify-static'), {
        root: path.join(__dirname, '../dist'),
        prefix: '/'
    })
}

const initialize = () => {
    try {
        const serverConfig = config.get('server')
        const server = fastify({ logger: serverConfig.logger })
        if (serverConfig.useClientBundler) {
            clientBundler(server)
        }
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
