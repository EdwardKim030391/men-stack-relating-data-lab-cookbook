const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index: List all foods
router.get('/', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('foods/index.ejs', { foods: user.pantry });
});

// New: Form to add new food
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// Create: Add a new food item
router.post('/', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  user.pantry.push({ name: req.body.name });
  await user.save();
  res.redirect('/users/' + user._id + '/foods');
});

// Edit: Form to edit a food item
router.get('/:itemId/edit', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const food = user.pantry.id(req.params.itemId);
  res.render('foods/edit.ejs', { food });
});

// Update: Update a food item
router.put('/:itemId', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const food = user.pantry.id(req.params.itemId);
  food.name = req.body.name;
  await user.save();
  res.redirect('/users/' + user._id + '/foods');
});

// Delete: Remove a food item
router.delete('/:itemId', async (req, res) => {
    try {
      const user = await User.findById(req.session.user._id);
      user.pantry = user.pantry.filter(item => item._id.toString() !== req.params.itemId);

      await user.save();
      res.redirect('/users/' + user._id + '/foods');
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  });


module.exports = router;
