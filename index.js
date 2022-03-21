require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');
const error = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use(error);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
