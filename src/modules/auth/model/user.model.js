const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
      },
  
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
      },
  
      password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
      },
  
      isEmailVerified: {
        type: Boolean,
        default: false
      },
  
      refreshToken: {
        type: String,
        select: false
      },
  
      passwordChangedAt: {
        type: Date
      },
  
      passwordResetAt: {
        type: Date
      },
  
      isActive: {
        type: Boolean,
        default: true,
        select: false
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }

},{timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;
