export const animalTypeSchema = {
  $id: 'animalType',
  type: 'object',
  properties: {
    typeOfAnimal: {
      type: 'string',
      minLength: 2,
      maxLength: 30,
    },
  },
};
