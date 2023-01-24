export const emailValidationRules = {
  required: "Email is required field.",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Entered value does not match email format.",
  },
};
