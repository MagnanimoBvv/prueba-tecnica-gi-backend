const express = require('express');
const router = express.Router();
const Task = require('../models/tasks');

/* GET tasks listing. */
router.get('', (req, res) => {
  Task.find()
  .then(tasks => res.json(tasks))
  .catch(err => res.json(err));
});

router.post('', (req, res) => {
  Task.create(req.body)
  .then(task => res.json(task))
  .catch(err => res.json(err));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndUpdate({ _id: id}, {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  }, {
    returnDocument: 'after',
  })
  .then(task => res.json(task))
  .catch(err => res.json(err));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete({_id: id})
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

module.exports = router;
