import userModel from '../user.model';
import client from '../../database/index';
import User from '../../types/user.type';

const UserModel = new userModel();

describe('Auth Module', () => {
  describe('Test Methods exists', () => {
    it('should have auth user method', () => {
      expect(UserModel.authenticate).toBeDefined();
    });
  });
  describe('Test auth logic', () => {
    const user = {
      firstName: 'test',
      lastName: 'user',
      password: 'test123',
    } as User;

    beforeAll(async () => {
      const createTestUser = await UserModel.create(user);
      user.usersID = createTestUser.usersID;
    });
    afterAll(async () => {
      const conn = await client.connect();
      const sql = `DELETE FROM users;`;
      await conn.query(sql);
      conn.release();
    });
    it('Authenticate method should return the authenticate user', async () => {
      const authenticateUser = await UserModel.authenticate(
        user.usersID as unknown as string,
        user.password as string
      );
      expect(authenticateUser?.usersID).toBe(user.usersID);
      expect(authenticateUser?.firstName).toBeUndefined();
      expect(authenticateUser?.lastName).toBeUndefined();
    });
    it('Authenticate method should return null for wrong password', async () => {
      const authenticateUser = await UserModel.authenticate(
        '300',
        'fake-password'
      );
      expect(authenticateUser).toBe(null);
    });
  });
});
