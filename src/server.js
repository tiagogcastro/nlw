const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "21964284144", 
        bio: 'Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
        subject: "Química",
        cost: "20",
        weekday: [
            0
        ],
        time_from: [720],
        time_to: [1220] 
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
]


const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Pega o número da aula e troca pelo nome
function getSubject(subjectNumber) {
    const position = + subjectNumber - 1
    return subjects[position]
}

// renderezando as page
function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res) {
    
    // Adicionando os dados cadastrados
    const data = req.query
    
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {

        // recebendo o nome da matéria
        data.subject = getSubject()

        // adicionar dados a lista de proffys
        proffys.push(data)   
        return res.redirect("/study")
    }
    // se nao, mostrar a page
    return res.render("give-classes.html", {subjects, weekdays})
}

server.use(express.static('public'))

.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

.listen(5500)
console.log('Atualizei ou iniciei')