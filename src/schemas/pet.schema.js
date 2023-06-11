export const petSchema = {
  $id: 'pet',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 25,
    },
    breed: {
      type: 'string',
      minLength: 3,
      maxLength: 25,
    },
    dateOfBirth: {
      type: 'string',
      format: 'date',
    },
    microchip: {
      type: 'string',
      minLength: 8,
      maxLength: 40,
    },
    ownerId: {
      type: 'string',
    },
  },
};
