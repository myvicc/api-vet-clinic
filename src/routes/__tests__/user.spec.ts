import { application } from '../../app';
import { User } from '../../mongo.models/users';

describe('user routes', () => {
  describe('POST /api/v1/user/register', () => {
    it('should create user', async () => {
      const email = 'test@test.test';
      const result = await application.inject({
        url: '/api/v1/user/register',
        body: {
          firstName: 'test',
          lastName: 'test',
          password: 'testtest!21S',
          email,
        },
        method: 'POST',
      });

      expect(result.statusCode).toStrictEqual(201);
      await User.findOneAndDelete({
        email,
      });
    });
  });
});
