const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send("Successful call to /user route");
})

router.get('/:id', (req, res, next) => {
  res.send("Successful call to /user/id route");
})

router.post('/', (req, res, next) => {
  res.send("Successful post call to /user");
})

router.put('/:id', (req, res, next) => {
  res.send("Successful put call to /user");
})

router.delete('/:id', (req, res, next) => {
  res.send("Successful delete call to /user");
})

module.exports = router;
