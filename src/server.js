const express = require('express')
const nunjucks = require('nunjucks')

const {pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses} = require('./pages')

const server = express()

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
    autoescape: false,
})

server.use(express.urlencoded({extended: true})).use(express.static('public'))

.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post('/save-classes', saveClasses)

.listen(5500)
console.log('Atualizei ou iniciei')