// npm dependencies
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// internal dependencies
const layout = require('./views/layout');
const { db, Page, User } = require('./models');


// confirm connection to database
db.authenticate().
then(() => {
  console.log('Connected to the database');
})

//re-routing to routes files
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));
app.get('/', (req, res, next) => {
  res.redirect('/wiki');
})

// initialize db (sync and seed with two test pages and users)
// and set app to listen
const init = async () => {
  await db.sync({force: true});
  await User.create({
    name: 'Tes One',
    email: 'testone@test.com'
  })
  await User.create({
    name: 'Tes Two',
    email: 'testtwo@test.com'
  })
  await Page.create({
    title: 'Test Title 1',
    content: 'Dummy article for testing',
    authorId: 1
  })
  await Page.create({
    title: 'Test Title 2',
    content: 'Another dummy article for testing',
    authorId: 2
  })

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init();
