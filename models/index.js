const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Page = db.define('page',{
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    slug: Sequelize.STRING,
    status: Sequelize.ENUM('open', 'closed')
})

const User = db.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

module.exports = {
  db,
  Page,
  User
}
