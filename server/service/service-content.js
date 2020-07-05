const feedSchema = require('../schema/schema-content')

module.exports = (fastify, opts, next) => {
    fastify.get(
        '/',
        feedSchema.getFeed,
        async () => {
            const contents = fastify.database.getFeed()
            return { contents }
        }
    )

    fastify.get(
        '/:contentId',
        feedSchema.get,
        async (request) => {
            const contentId = request.params.contentId
            if (!contentId) {
                throw { statusCode: 400, message: 'Content id missing' }
            }
            const content = fastify.database.get(contentId)
            if (!content) {
                throw { statusCode: 404, message: 'Content not found' }
            }
            return { content }
        }
    )

    fastify.put(
        '/:contentId',
        feedSchema.update,
        async (request) => {
            const contentId = request.params.contentId
            const content = request.body
            if (!contentId) {
                throw { statusCode: 400, message: 'No contentId specified' }
            }
            if (!content) {
                throw { statusCode: 400, message: 'Missing content body' }
            }
            const updatedContent = fastify.database.update(contentId, JSON.parse(content))
            return { header: { 'Content-Type': 'application/json' }, content: updatedContent }
        }
    )

    fastify.delete(
        '/:contentId',
        feedSchema.remove,
        async (request) => {
            const contentId = request.params.contentId
            if (!contentId) {
                throw { statusCode: 400, message: 'No contentId specified' }
            }
            const status = fastify.database.delete(contentId)
            if (!status) {
                throw { statusCode: 404, message: 'Content not found' }
            }
            return { statusCode: 200, message: 'OK' }
        }
    )

    fastify.post(
        '/',
        feedSchema.create,
        async (request) => {
            const content = request.body
            if (!content) {
                throw { statusCode: 400, message: 'Missing content body' }
            }
            const createdContent = fastify.database.create(JSON.parse(content))
            return { header: { 'Content-Type': 'application/json' }, content: createdContent }
        }
    )

    next()
}
