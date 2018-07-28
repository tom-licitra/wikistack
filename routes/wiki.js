const express = require('express');
const router = express.Router();

const { Page } = require('../models');
const addPage = require('../views/addPage');
const layout = require('../views/layout');

router.use(express.urlencoded({extended: false}));

router.get('/', (req, res, next) => {
  res.send(layout(''));
})

router.post('/', async (req, res, next) => {

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  console.log(page);

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

module.exports = router;
