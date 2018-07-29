// npm dependencies
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: false}));

// internal dependencies
const { Page, User } = require('../models');
const { layout, addPage, editPage, main, wikipage } = require('../views');

// GET /wiki
router.get('/', async (req, res, next) => {
  try {
    const pageList = await Page.findAll();
    console.log(pageList);
    res.send(main(pageList));
  }
  catch (error) { next(error)}
})

// POST /wiki
router.post('/', async (req, res, next) => {
  try {
    // select author from users table
    let author = await User.findOne({
      where: {name: req.body.author}
    })
    // if author does not exist, create new user and save as author
    if (!author){
      author = await User.create({
        name: req.body.author,
        email: req.body.email
      }, {returning: true})
    }
    // add page to pages
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

// GET /wiki/add
router.get('/add', (req, res, next) => {
  res.send(addPage());
})

// GET /wiki/slug
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    const author = await page.getAuthor({
      where: {id: page.authorId}
    })
    res.send(wikipage(page, author));
  }
  catch (error) { next(error) }
});

// GET /wiki/slug/edit
router.get('/:slug/edit', async (req, res, next) => {
  const page = await Page.findOne({
    where: {slug: req.params.slug}
  })
  const author = await page.getAuthor({
    where: {id: page.authorId}
  })
  res.send(editPage(page, author));
})

// POST /wiki/slug (updates page)
router.post('/:slug', async (req, res, next) => {
  // select original page
  let page = await Page.findOne({
    where: {slug: req.params.slug}
  })
  // update page and save updated version
  page = await Page.update({
    title: page.title, // prevents title change
    content: req.body.content,
    status: req.body.status,
  },
  {
    returning: true,
    where: {slug: req.params.slug}
  })
  // redirect to updated page
  res.redirect(`/wiki/${page[1][0].slug}`);
})

// GET /wiki/slug/delete
router.get('/:slug/delete', (req, res, next) => {
  Page.destroy({
    where: {slug: req.params.slug}
  })
  res.redirect('/');
})

// NEXT error handling
router.use('/', (error, req, res, next) => {
  console.log(error);
  res.status(404).send(layout(`<p><br><br>Page not found.</p>`));
})

module.exports = router;
