const express = require('express');

const app = express();

app.use(express.json());

require('dotenv').config();

app.get('/products');
app.get('/products:id');
app.post('/products');
app.put('/products:id');
app.delete('/products:id');

app.get('/sales');
app.get('/sales:id');
app.post('/sales');
app.post('/sales:id');
app.put('/sales:id');
app.delete('/sales:id');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
