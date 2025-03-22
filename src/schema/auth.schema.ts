import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().lowercase().trim().messages({
    "any.required": "Email is a required field",
    "string.base": "Email must be a string",
    "string.email": "Invalid email",
    "string.empty": "Email cannot be empty",
  }),

  password: Joi.string().min(6).max(32).trim().required().messages({
    "any.required": "Password is required field",
    "string.base": "Password must be a string",
    "string.min": "Password must be atleast 6 characters",
    "string.max": "Password cannot exceed 32 characters",
    "string.empty": "Password cannot be empty",
  }),
});
