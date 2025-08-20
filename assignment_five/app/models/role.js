const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { 
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function(value) {
        return ['User', 'Admin'].includes(value);
      },
      message: props => `${props.value} is not a valid role`
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
