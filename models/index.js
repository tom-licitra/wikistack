// npm dependencies
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

// create slug replaces spaces with _ and removes special characters
const createSlug = title => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

// Define users and pages
const User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false, unique: true},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}}
})

const Page = db.define('page',{
    title: {type: Sequelize.STRING, allowNull: false},
    content: {type: Sequelize.TEXT,allowNull: false},
    slug: {type: Sequelize.STRING, allowNull: false},
    status: {type: Sequelize.ENUM('open', 'closed'), defaultValue: 'open'}
})

User.hasMany(Page);
Page.belongsTo(User, {as: 'author'});

Page.beforeValidate((page, option) => {
  page.slug = createSlug(page.title)
})

module.exports = {
  db,
  Page,
  User
}
