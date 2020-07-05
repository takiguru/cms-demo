class MongoDB {
    constructor () {
        this._initialized = false
        this.initialize()
    }

    initialize (file) {}

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
