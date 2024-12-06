import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please tell us your full name'],
    trim: true,
    maxLength: [50, 'Your name cannot be longer than 50 characters']
  },
  emailAddress: {
    type: String,
    required: [true, 'Please provide your email address'],
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please provide a valid email address'
    ]
  },
  userPassword: {
    type: String,
    required: [true, 'Please create a password'],
    minLength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now
  },
  lastLoginDate: {
    type: Date
  }
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('userPassword')) {
    next();
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  this.userPassword = await bcrypt.hash(this.userPassword, salt);
});

userSchema.methods.createLoginToken = function() {
  return jwt.sign(
    { userId: this._id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Check password
userSchema.methods.isPasswordCorrect = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.userPassword);
};

export const User = mongoose.model('User', userSchema);