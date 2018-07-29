// npm dependencies
const express = require('express');
const router = express.Router();

// internal dependencies
const { Page, User } = require('../models');
const { userList, userPages } = require('../views');

// GET /users
router.get('/', async (req, res, next) => {
  const users = await User.findAll();
  res.send(userList(users));
})

// GET /users/authorId
router.get('/:id', async (req, res, next) => {
  const user = await User.findOne({
    where: {id: req.params.id}
  })
  const pages = await Page.findAll({
    where: {authorId: req.params.id}
  })
  res.send(userPages(user, pages));
})

module.exports = router;
