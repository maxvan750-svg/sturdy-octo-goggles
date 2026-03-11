const Joi = require('joi');

// Validation schema for posts
const postSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().required(),
  createdAt: Joi.date().default(Date.now)
});

// Validation schema for triggers
const triggerSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('email', 'webhook', 'sms').required(),
  active: Joi.boolean().default(true)
});

// Validation schema for configurations
const configSchema = Joi.object({
  settingName: Joi.string().required(),
  settingValue: Joi.string().required(),
  updatedAt: Joi.date().default(Date.now)
});

module.exports = { postSchema, triggerSchema, configSchema };
