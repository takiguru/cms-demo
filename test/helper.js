const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const config = require('config')
const serverConfig = config.get('server')
const host = `http://${serverConfig.host}:${serverConfig.port}`

const getRequest = (url) => {
    return new Promise((resolve, reject) => {
        chai.request(host)
            .get(url)
            .then(res => resolve(res))
            .catch((err) => reject(err))
    })
}

const deleteRequest = (url) => {
    return new Promise((resolve, reject) => {
        chai.request(host)
            .delete(url)
            .then(res => resolve(res))
            .catch((err) => reject(err))
    })
}

const putRequest = (url, content) => {
    return new Promise((resolve, reject) => {
        chai.request(host)
            .put(url)
            .type('text/plain')
            .send(JSON.stringify(content))
            .then(res => resolve(res))
            .catch((err) => reject(err))
    })
}

const postRequest = (url, content) => {
    return new Promise((resolve, reject) => {
        chai.request(host)
            .post(url)
            .type('text/plain')
            .send(JSON.stringify(content))
            .then(res => resolve(res))
            .catch((err) => reject(err))
    })
}

module.exports = { getRequest, putRequest, postRequest, deleteRequest }
