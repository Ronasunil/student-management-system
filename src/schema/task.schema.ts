import Joi from "joi";

const taskAssignSchema = Joi.object({
  studentId: Joi.string().required().messages({
    "any.required": "studentId is a required field",
    "string.empty": "studentId cannot be empty",
    "string.base": "studentId must be a string",
  }),
  name: Joi.string().required().trim().min(3).max(32).messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "any.required": "Name is a required field",
    "string.min": "Name must be atleast 6 character long",
    "string.max": "Name cannot exceed 32 characters",
  }),

  taskName: Joi.string().required().trim().max(32).messages({
    "any.required": "taskName is a required field",
    "string.empty": "taskName cannot be empty",
    "string.base": "taskName must be a string",
    "string.max": "taskName cannot exceed 32 characters",
  }),
  email: Joi.string().email().required().trim().messages({
    "any.required": "Email is a required field",
    "string.base": "Email must be a string",
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid Email",
  }),
  dueTime: Joi.date().greater("now").required().messages({
    "any.required": "dueTime is a required field",
    "date.base": "dueTime must be a Date",
    "date.emty": "dueTime cannot be empty",
    "date.greater": "dueTime must be in the future",
  }),
});

export { taskAssignSchema };
