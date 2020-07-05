/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const helper = require('../helper')
const contentRequest = require('./const/contentRequest')
require('../../server/main')

suite('/content', () => {
    test('Get all content', async () => {
        let response, error
        try {
            response = await helper.getRequest('/content')
        } catch (err) { error = err } finally {
            expect(error).to.be.undefined
            expect(response).to.have.status(200)
            expect(response.body).to.have.property('contents')
            expect(response.body.contents).to.a('array')
        }
    })

    test('Create content', async () => {
        let response, error
        try {
            response = await helper.postRequest('/content', contentRequest)
        } catch (err) { error = err } finally {
            expect(error).to.be.undefined
            expect(response).to.have.status(200)
            expect(response.body.content).to.a('object')
        }
    })

    test('Get content', async () => {
        let response, error
        try {
            const contentResponse = await helper.postRequest('/content', contentRequest)
            response = await helper.getRequest(`/content/${contentResponse.body.content.Id}`)
        } catch (err) { error = err } finally {
            expect(error).to.be.undefined
            expect(response).to.have.status(200)
            expect(response.body.content).to.a('object')
        }
    })

    test('Update content', async () => {
        let response, error, modifiedContent
        try {
            const contentResponse = await helper.postRequest('/content', contentRequest)
            modifiedContent = contentResponse.body.content
            modifiedContent.Name = 'TEST'
            response = await helper.putRequest(`/content/${modifiedContent.Id}`, modifiedContent)
        } catch (err) { error = err } finally {
            expect(error).to.be.undefined
            expect(response).to.have.status(200)
            expect(response.body.content).to.deep.eq(modifiedContent)
        }
    })

    test('Delete content', async () => {
        let createResponse, deleteResponse, getResponse, error
        try {
            createResponse = await helper.postRequest('/content', contentRequest)
            deleteResponse = await helper.deleteRequest(`/content/${createResponse.body.content.Id}`)
            getResponse = await helper.getRequest(`/content/${createResponse.body.content.Id}`)
        } catch (err) { error = err } finally {
            expect(error).to.be.undefined
            expect(deleteResponse).to.have.status(200)
            expect(getResponse).to.have.status(404)
        }
    })
})
