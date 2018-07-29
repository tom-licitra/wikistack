const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

const createSlug = title => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
//   let space = new RegExp('\\s')
//   title = title.replace(space,'_').toLowerCase()
//   if (title.search(space) < 0) {
//     return title
//   }
//   return createSlug(title)
}

const Page = db.define('page',{
    title: {type: Sequelize.STRING, allowNull: false},
    content: {type: Sequelize.TEXT,allowNull: false},
    slug: {type: Sequelize.STRING, allowNull: false},
    status: {type: Sequelize.ENUM('open', 'closed'), defaultValue: 'open'}
})

const User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}}
})

Page.belongsTo(User, {as: 'author'});

Page.beforeValidate((page, option) => {
  page.slug = createSlug(page.title)
})

// User.create({
//   name: 'Tes Tone',
//   email: 'testone@test.com'
// })

module.exports = {
  db,
  Page,
  User
}
