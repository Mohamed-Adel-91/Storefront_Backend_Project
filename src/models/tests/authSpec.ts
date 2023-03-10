import userModel from '../user.model';
import client from '../../database';
import User from '../../types/user.type';

const Users = new userModel();

describe('Auth Module', () => {
  describe('Test Methods exists', () => {
    it('should have auth user method', () => {
      expect(Users.authenticate).toBeDefined();
    });
  });
  describe('Test auth logic', () => {
    const user = {
      firstName: 'test',
      lastName: 'user',
      userName: 'mohamed123',
      password: 'test123',
    } as User;

    beforeAll(async () => {
      const createTestUser = await Users.create(user);
      user.usersID = createTestUser.usersID;
    });
    afterAll(async () => {
      const conn = await client.connect();
      const sql = `DELETE FROM users;`;
      await conn.query(sql);
      conn.release();
    });
    it('Authenticate method should return the authenticate user', async () => {
      const authenticateUser = await Users.authenticate(
        user.usersID as unknown as string,
        user.password as string
      );
      expect(authenticateUser?.usersID).toBe(user.usersID);
      expect(authenticateUser?.firstName).toBeUndefined();
      expect(authenticateUser?.lastName).toBeUndefined();
      expect(authenticateUser?.userName).toBeUndefined();
    });
    it('Authenticate method should return null for wrong password', async () => {
      const authenticateUser = await Users.authenticate(
        '300',
        'fake-password'
      );
      expect(authenticateUser).toBe(null);
    });
  });
});
