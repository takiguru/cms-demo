const config = require('config')
const FileDatabase = require('../module/module-db-file')
const MongoDB = require('../module/module-db-mongo')
const databaseConfig = config.get('server.database')

function databaseSelector () {
    if (databaseConfig.useDatabase) {
        return new MongoDB()
    } else {
        return new FileDatabase()
    }
}

module.exports = databaseSelector()
