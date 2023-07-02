export const doctorSchema = {
  $id: 'doctor',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
      maxLength: 25,
    },
    lastName: {
      type: 'string',
      minLength: 3,
      maxLength: 25,
    },
    email: {
      type: 'string',
      minLength: 8,
      maxLength: 40,
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 40,
      pattern: '[^a-zA-Z0-9]',
    },
    _id: {
      type: 'string',
    },
  },
};
