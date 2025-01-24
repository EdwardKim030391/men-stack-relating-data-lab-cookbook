const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    
    res.render('users/index', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('pantry');

    res.render('users/show', { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');;
  }
});

module.exports = router;
