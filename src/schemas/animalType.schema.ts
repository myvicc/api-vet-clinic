export const animalTypeSchema = {
  $id: 'animalType',
  type: 'object',
  properties: {
    type: {
      type: 'string',
      minLength: 2,
      maxLength: 30,
    },
    id: {
      type: 'string',
    },
  },
};
