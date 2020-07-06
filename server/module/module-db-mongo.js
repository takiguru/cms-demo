const dbFile = require('../datasource/content.json')
const config = require('config')
const mongoose = require('mongoose')
const Content = require('../model/model-content')

class MongoDB {
    constructor () {
        this._initialized = false
    }

    async _connect () {
        const databaseConfig = config.get('server.database')
        try {
            await mongoose.connect(`mongodb://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.collection}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
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
        this._initialized = true
        // Upload base data from file
        if (!dbFile.Items) {
            console.warn('Data source missing for base elements. Skip loading it')
            return
        }
        dbFile.Items.forEach(async content => {
            try {
                let contentDocument = await Content.findOne({ Name: content.Name })
                if (contentDocument) {
                    return
                }
                console.log(`Add missing content from file named as: ${content.Name}`)
                contentDocument = new Content(content)
                await contentDocument.save()
            } catch (err) {
                console.warn('Add content from file failed! Error:', err)
            }
        })
    }

    _checkContentId (contentId) {
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            throw new Error('Not valid content id!')
        }
    }

    isInitilized () {
        if (!this._initialized) {
            throw new Error('MongoDB is not initialized!')
        }
    }

    async create (data) {
        this._isInitilized()
        let contentDocument = await Content.findOne({ Name: data.Name })
        if (contentDocument) {
            throw new Error('Content already exists with this name')
        }
        contentDocument = new Content(data)
        await contentDocument.validate()
        await contentDocument.save()
        return contentDocument.toJSON()
    }

    async update (contentId, data) {
        this.isInitilized()
        this._checkContentId(contentId)
        const contentDocument = await Content.findOne({ _id: mongoose.Types.ObjectId(contentId) })
        if (!contentDocument) {
            throw new Error('Content not found')
        }
        await contentDocument.update(data)
        await contentDocument.validate()
        await contentDocument.save()
        return contentDocument.toJSON()
    }

    async delete (contentId) {
        this.isInitilized()
        this._checkContentId(contentId)
        return await Content.deleteOne({ _id: mongoose.Types.ObjectId(contentId) })
    }

    async get (contentId) {
        this.isInitilized()
        this._checkContentId(contentId)
        return await Content.findOne({ _id: mongoose.Types.ObjectId(contentId) })
    }

    async getFeed () {
        this.isInitilized()
        return await Content.find()
    }
}

module.exports = new MongoDB()
