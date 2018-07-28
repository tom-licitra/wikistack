const express = require('express');
const app = express();
const path = require('path');

const layout = require('./views/layout');
const { db, Page, User } = require('./models');

db.authenticate().
then(() => {
  console.log('Connected to the database');
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/wiki', require('./routes/wiki'));

app.use('/user', require('./routes/user'));

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})


const init = async () => {
  await db.sync({force: true});

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
