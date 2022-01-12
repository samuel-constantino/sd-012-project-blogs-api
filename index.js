const express = require('express');

const { json } = require('body-parser');

const { userRouter, loginRouter, categoryRouter, postRouter } = require('./routes');

const app = express();

app.use(json());

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
