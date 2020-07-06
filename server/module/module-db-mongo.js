const dbFile = require('../datasource/content.json')
const config = require('config')
const mongoose = require('mongoose')

class MongoDB {
    constructor () {
        this._initialized = false
    }

    async _connect () {
        const databaseConfig = config.get('server.database')
        try {
            await mongoose.connect(`mongodb://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.collection}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Mongodb connection successful')
            return true
        } catch (err) {
            console.error('Mongodb connection failed:', err)
            return false
        }
    }

    async initialize () {
        const connected = await this._connect()
        if (!connected) {
            console.error('Connect to database failed! Read error above!')
            process.exit(1)
        }
    }

    _isInitilized () {
        if (!this._initialized) {
            console.warn('MongoDB is not initialized!')
        }
    }

    create (data) {
        this._isInitilized()
    }

    update (contentId, data) {
        this._isInitilized()
    }

    delete (contentId) {
        this._isInitilized()
    }

    get (contentId) {
        this._isInitilized()
    }

    getFeed () {
        this._isInitilized()
    }
}

module.exports = new MongoDB()
