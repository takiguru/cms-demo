const contentSchema = require('../const/content-schema')
const get = {
    schema: {
        params: {
            type: 'object',
            properties: {
                contentId: { optional: true, type: 'string' }
            }
        },
        response: {
            200: {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    content: contentSchema
                }
            },
            404: {
                description: 'Content not found',
                type: 'object'
            }
        }
    }
}

const getFeed = {
    schema: {
        response: {
            200: {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    contents: {
                        type: 'array',
                        items: contentSchema
                    }
                }
            },
            404: {
                description: 'Content not found',
                type: 'object'
            }
        }
    }
}

const update = {
    schema: {
        params: {
            type: 'object',
            properties: {
                contentId: { type: 'string' }
            }
        },
        response: {
            200: {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    content: contentSchema
                }
            }
        }
    }
}

const create = {
    schema: {
        params: {
            type: 'object',
            properties: {
                content: { type: 'object', default: contentSchema }
            }
        },
        response: {
            200: {
                description: 'Succesful response',
                type: 'object',
                properties: {
                    content: contentSchema
                }
            }
        }
    }
}

const remove = {
    schema: {
        params: {
            type: 'object',
            properties: {
                contentId: { type: 'string' }
            }
        },
        response: {
            200: {
                description: 'Succesful response',
                type: 'object',
                properties: {
                }
            }
        }
    }
}

module.exports = { get, getFeed, update, create, remove }
