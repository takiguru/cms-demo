const dbFile = require('../datasource/content.json')
const uuidGenerator = require('uuid')

class FileDatabase {
    constructor () {
        this._initialized = false
        this._initialize(dbFile) // It's just a demo
    }

    _initialize (file) {
        this.db = {}
        if (!file.Items) {
            console.error('\'Items\' array can\'t be found in \'feed.json\'')
            return
        }
        file.Items.forEach(content => {
            const contentId = content.Id
            if (this.db[contentId]) {
                console.warn(`Content '${content.Name}' already in the database`)
                return
            }
            delete content.Id
            this.db[contentId] = content
        })
        this._initialized = true
        console.log(`File database loaded! Content amount: ${Object.keys(this.db).length}`)
    }

    _isInitilized () {
        if (!this._initialized) {
            console.warn('Filedatabase is not initialized!')
        }
    }

    create (data) {
        this._isInitilized()
        const uuid = uuidGenerator.v4() // Maybe check for existence?
        this.db[uuid] = data
        return Object.assign(this.db[uuid], { Id: uuid })
    }

    update (contentId, data) {
        this._isInitilized()
        if (!this.db[contentId]) {
            return false
        }
        this.db[contentId] = data
        return this.db[contentId]
    }

    delete (contentId) {
        this._isInitilized()
        if (!this.db[contentId]) {
            return false
        }
        delete this.db[contentId]
        return true
    }

    get (contentId) {
        this._isInitilized()
        if (!this.db[contentId]) {
            return false
        }
        return this.db[contentId]
    }

    getFeed () {
        this._isInitilized()
        const collection = []
        Object.keys(this.db).forEach(contentKey => {
            const content = this.db[contentKey]
            collection.push({
                BackgroundUrl: content.BackgroundUrl,
                ProductionYear: content.ProductionYear,
                Genre: content.Genre,
                Name: content.Name,
                AgeRating: content.AgeRating,
                Id: contentKey
            })
        })
        return collection
    }
}

module.exports = new FileDatabase()
