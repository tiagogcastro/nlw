import { app } from './app';

app.get("/", (req, res) => {
  return res.render("index.html")
});

app.get("/create-point", (req, res) => {
 return res.render("create-point.html")
});

app.post('/savepoint', (req, res) => {
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

      return res.render('create-point.html', { saved: true })
''    }

  db.run(query, values, afterInsertData)

});

app.get("/search", (req, res) => {
  const search = req.query.search;

  if(search == '') {
      return res.render("search-results.html", { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if(err) {
          return err;
      }

      const total = rows.length

      return res.render("search-results.html", { places: rows, total }) 
  })
});
