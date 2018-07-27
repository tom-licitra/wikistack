const express = require('express');
const app = express();
const path = require('path');

const layout = require('./views/layout');
const { db, Page, User } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.send(layout(""));
})


const init = async () => {
  await User.sync({force: true});
  await Page.sync({force: true});

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
