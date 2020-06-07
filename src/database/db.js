// importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

// utilizar o objeto de banco de dados para nossas operações
// db.serialize( () => {
//     // com comandos SQL eu vou:

//     // 1 - criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    
    `)

//     // 2 - inserir dados na tabela
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES ( ?,?,?,?,?,?,? ); 
// `
//     const values = [
//         "https://static.wixstatic.com/media/897b7e_e177173692bf43a3939804ced82b8220~mv2.jpg",
//         "Papersider",
//         "Guilherme Gemballa, Jardmin América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"


//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log('Cadastrado com sucesso!')
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

//     // 3 - consultar os dados da tabela
//     db.all(`SELECT * FROM places `, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log('Aqui estão seus registros: ')
//         console.log(rows)
//     })
    
//     // 4 - Deletar um dado na tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }
    //     console.log('Registro deletado com sucesso!')
    // })
// })

// })