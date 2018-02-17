let mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Title must not exceed {ARGS[1]} characters.'
  })
];

let BookSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: [true, 'Title is required.'],
    validate: nameValidator
  },
  updated_date: {type: Date, default: Date.now}
});

// Use the unique validator plugin
BookSchema.plugin(unique, {message: 'That {PATH} is already taken.'});

module.exports = mongoose.model('Book', BookSchema);
