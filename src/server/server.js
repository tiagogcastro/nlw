const { app } = require('./app');

const port = 3000;

const starting_log = `
Ecoleta stating in port: ${port}
`;

app.listen(port, () => console.log(starting_log));