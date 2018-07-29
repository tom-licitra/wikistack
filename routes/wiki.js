const express = require('express');
const router = express.Router();

const { db, Page, User } = require('../models');
const { addPage, editPage, main, userList, userPages, wikipage } = require('../views');

router.use(express.urlencoded({extended: false}));

router.get('/', async (req, res, next) => {
  try {
    const pageList = await Page.findAll();
    console.log(pageList);
    res.send(main(pageList));
  }
  catch (error) { next(error)}
})

router.post('/', async (req, res, next) => {
  try {
    await User.create({
      name: req.body.author,
      email: req.body.email
    })
    const author = await User.findOne({
      where: {name: req.body.author}
    })
    const page = new Page({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      authorId: author.id
    });
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
  try {
    const newPage = await Page.findOne({
      where: {slug: `${req.params.slug}`}
    })
    const author = await User.findOne({
      where:{ id: newPage.authorId }
    })
    res.send(wikipage(newPage, author.name));
  }
  catch (error) { next(error) }
});

module.exports = router;
