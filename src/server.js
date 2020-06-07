 const express = require("express")

 const server = express()

// pegar o banco de dados - aula 5
const db = require('./database/db.js')

// configurar pasta pública
server.use(express.static('public'))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded( { extended: true } ))

// utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
} )

// configurar caminhos da minha aplicação
// pagina inicial

// req: Requisição
// res: Resposta

server.get("/", (req, res) => {
    return res.render("index.html") // Posso por um {} com a mensagem aqui para entrarno html e por msg la
})

server.get("/create-point", (req, res) => {
    console.log(req.query)
   return res.render("create-point.html")
})

server.post('/savepoint', (req, res) => {

    // req.body: O corpo do nosso formulario
    console.log(req.body)

    // inserir dados no banco de dados

    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES ( ?,?,?,?,?,?,? ); 
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send('Erro no cadastro!')
        }
        console.log('Cadastrado com sucesso!')
        console.log(this)

        return res.render('create-point.html', { saved: true })

    }

    db.run(query, values, afterInsertData)

})


server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == '') {
        // Pesquisa vazia
        return res.render("search-results.html", { total: 0 }) // pode deixar so total.
}
    // pegar os dados do banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total }) // pode deixar so total.
    })
 })

// Antes de ter o nunjucks. \/

// server.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html")
// })

// server.get("/create-point", (req, res) => {
//     res.sendFile(__dirname + "/views/create-point.html")
// })


// ligar o servidor
server.listen(3000)
