/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const FileDatabaseModule = require('../../server/module/module-db-file')
const fileDatabase = new FileDatabaseModule()

suite('module-db-file', () => {
    test('Check if the content is created', async () => {
        const testValue = { test: true }
        const content = fileDatabase.create(testValue)
        expect(content).to.be.a('object')
        expect(content).include(testValue)
    })

    test('Get multiple content', async () => {
        const contents = fileDatabase.getFeed()
        expect(contents).to.be.a('array')
    })
    test('Get content', async () => {
        const contents = fileDatabase.getFeed()
        let testContent = {}
        if (!contents[0]) {
            testContent = fileDatabase.create({ test: true })
        } else {
            testContent = contents[0]
        }
        const requestedContent = fileDatabase.get(testContent.Id)
        expect(requestedContent).to.be.a('object')
    })
    test('Update content', async () => {
        const contents = fileDatabase.getFeed()
        let testContent = {}
        if (!contents[0]) {
            testContent = fileDatabase.create({ test: true })
        } else {
            testContent = contents[0]
        }
        const updatedContent = fileDatabase.update(Object.assign(testContent, { updated: true }))
        const requestedContent = fileDatabase.get(updatedContent.Id)
        expect(updatedContent).to.deep.equal(requestedContent)
    })
    test('Delete content', async () => {
        const contents = fileDatabase.getFeed()
        let testContent = {}
        if (!contents[0]) {
            testContent = fileDatabase.create({ test: true })
        } else {
            testContent = contents[0]
        }
        const deleteStatus = fileDatabase.delete(testContent.Id)
        const requestedContent = fileDatabase.get(testContent.Id)
        expect(requestedContent).to.eq(false)
        expect(deleteStatus).to.eq(true)
    })
})
