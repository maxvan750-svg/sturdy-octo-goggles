const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

// Account Schema
const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Trigger Schema
const triggerSchema = new mongoose.Schema({
  event: { type: String, required: true },
  action: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Queue Schema
const queueSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Account = mongoose.model('Account', accountSchema);
const Trigger = mongoose.model('Trigger', triggerSchema);
const Queue = mongoose.model('Queue', queueSchema);

module.exports = { User, Post, Account, Trigger, Queue };

