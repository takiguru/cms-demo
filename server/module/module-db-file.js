const dbFile = require('../datasource/content.json')
const uuidGenerator = require('uuid')

class FileDatabase {
    constructor () {
        this._initialized = false
    }

    initialize () {
        const file = dbFile
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

    isInitialized () {
        if (!this._initialized) {
            console.warn('Filedatabase is not initialized!')
        }
        return this._initialized
    }

    create (data) {
        this.isInitialized()
        const uuid = uuidGenerator.v4() // Maybe check for existence?
        this.db[uuid] = data
        return Object.assign(this.db[uuid], { Id: uuid })
    }

    update (contentId, data) {
        this.isInitialized()
        if (!this.db[contentId]) {
            return false
        }
        this.db[contentId] = data
        return this.db[contentId]
    }

    delete (contentId) {
        this.isInitialized()
        if (!this.db[contentId]) {
            return false
        }
        delete this.db[contentId]
        return true
    }

    get (contentId) {
        this.isInitialized()
        if (!this.db[contentId]) {
            return false
        }
        return this.db[contentId]
    }

    getFeed () {
        this.isInitialized()
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
        return null
    }
}

module.exports = new FileDatabase()
