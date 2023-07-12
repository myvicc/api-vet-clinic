export const animalSchema = {
  $id: 'animal',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 25,
    },
    age: {
      type: 'number',
      minLength: 0,
      maxLength: 10,
    },
    breed: {
      type: 'string',
      minLength: 2,
      maxLength: 40,
    },
    animalType: {
      type: 'string',
      minLength: 3,
      maxLength: 40,
    },
    ownerId: {
      type: 'string',
    },
    _id: {
      type: 'string',
    },
  },
};
