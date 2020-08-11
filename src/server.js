const express = require('express')
const nunjucks = require('nunjucks')

const {pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    pageSucess} = require('./pages')

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
.get('/sucesso', pageSucess)
.post('/save-classes', saveClasses)

.listen(5500)
console.log('Atualizei ou iniciei')