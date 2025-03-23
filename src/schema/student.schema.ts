import Joi from "joi";

const studentCreationSchema = Joi.object({
  department: Joi.string().required().trim().messages({
    "any.required": "Department is a required field",
    "string.base": "Department must be string",
    "string.empty": "Department cannot be empty",
  }),
  email: Joi.string().email().required().lowercase().trim().messages({
    "any.required": "Email is a required field",
    "string.base": "Email must be a string",
    "string.email": "Invalid email",
    "string.empty": "Email cannot be empty",
  }),
  name: Joi.string().min(3).max(32).required().trim().messages({
    "string.base": "Name must be a string",
    "any.required": "Name is required field",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be 3 characters long",
    "string.max": "Password cannot exceed 32 characters",
  }),
  password: Joi.string().min(6).max(32).required().trim().messages({
    "any.required": "Password is a required field",
    "string.base": "Password must be a string",
    "string.min": "Password must be atleast 6 characters",
    "string.max": "Password cannot exceed 32 characters",
    "string.empty": "Password cannot be empty",
  }),
});

export { studentCreationSchema };
