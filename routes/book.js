const express = require('express');
const router = express.Router();
const stringCapitalizeName = require('string-capitalize-name');
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const Book = require('../models/Book.js');

const uuid = require('uuid');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs
  delayMs: 0, // Disable delaying - full speed until the max limit is reached
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      msg: `You made too many requests. Please try again after ${minutes} minutes.`
    });
  }
});


/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  Book.find({}).select('id title')
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
    });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id).select('id title')
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({success: false, msg: `No such Book.`});
    });
});

/* SAVE BOOK */
router.post('/', postLimiter, (req, res, next) => {
  let newBook = new Book({
    id: uuid.v4(),
    title: sanitizeName(req.body.title)
  });

  newBook.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          id: result.id,
          title: result.title
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.title) {
          res.status(400).json({success: false, msg: err.errors.title.message});
          return;
        }

        // Show failed if all else fails for some reasons
        res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
      }
    });
});

/* UPDATE BOOK */
router.put('/:id', (req, res, next) => {
  let updatedBook = {
    title: sanitizeName(req.body.title)
  };

  Book.findOneAndUpdate({_id: req.params.id}, updatedBook, {runValidators: true, context: 'query'})
    .then((oldResult) => {
      Book.findOne({_id: req.params.id})
        .then((result) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              id: result.id,
              title: result.title
            }
          });
        })
        .catch((err) => {
          res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
        });

    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.title) {
          res.status(400).json({success: false, msg: err.errors.title.message});
          return;
        }

        // Show failed if all else fails for some reasons
        res.status(500).json({success: false, msg: `Something went wrong. ${err}`});
      }
    });
});

/* DELETE BOOK */
router.delete('/:id', (req, res, next) => {
  Book.deleteOne({id: req.params.id})
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          id: req.params.id
        }
      });
    })
    .catch((err) => {
      res.status(404).json({success: false, msg: 'Nothing to delete.'});
    });
});

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
};

module.exports = router;
