const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
require('./config/dbConfig');

app.use(cors()); // Aplica o CORS para todas as origens

app.use(express.json()); // Habilita o uso de JSON nas requisições
app.use(routes); // Importa as rotas definidas no arquivo routes.js

const port = 3333;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Servidor backend está rodando em http://localhost:${port}`);
});

module.exports = app;
