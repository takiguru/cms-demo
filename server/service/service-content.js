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
        async (request, response) => {
            const contentId = request.params.contentId
            const content = fastify.database.get(contentId)
            if (!content) {
                return response.code(404).send('Content not found')
            }
            return { content }
        }
    )

    fastify.put(
        '/:contentId',
        feedSchema.update,
        async (request, response) => {
            const contentId = request.params.contentId
            const content = request.body
            if (!contentId) {
                return response.code(400).send('No contentId specified')
            }
            if (!content) {
                return response.code(400).send('Missing content body')
            }
            fastify.database.update(contentId, JSON.parse(content))
            return response.code(200).send('OK')
        }
    )

    fastify.delete(
        '/:contentId',
        feedSchema.remove,
        async (request, response) => {
            const contentId = request.params.contentId
            if (!contentId) {
                return response.code(400).send('No contentId specified')
            }
            const status = fastify.database.delete(contentId)
            if (!status) {
                return response.code(400).send('Content not found')
            }
            return response.code(200).send('OK')
        }
    )

    fastify.post(
        '/',
        feedSchema.create,
        async (request, response) => {
            const content = request.body
            if (!content) {
                return response.code(400).send('Missing content body')
            }
            fastify.database.create(JSON.parse(content))
            return response.code(200).send('OK')
        }
    )

    next()
}
