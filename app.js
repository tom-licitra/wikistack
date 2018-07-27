const express = require('express');
const app = express();
const path = require('path');

const layout = require('./views/layout');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.send(layout(""));
})

const PORT = process.env.DATABASE_URL || 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
