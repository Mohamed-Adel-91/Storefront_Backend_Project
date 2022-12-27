import userModel from '../../models/user.model';
import client from '../../database';
import User from '../../types/user.type';

const userStore = new userModel();

describe('UserModels', () => {
  describe('Test Methods', () => {
    it('Get all users method', () => {
      expect(userStore.index).toBeDefined();
    });
    it('Get one user method', () => {
      expect(userStore.show).toBeDefined();
    });
    it('create one user method', () => {
      expect(userStore.create).toBeDefined();
    });
    it('Update one user method', () => {
      expect(userStore.update).toBeDefined();
    });
    it('Delete one user method', () => {
      expect(userStore.delete).toBeDefined();
    });
    it('Authenticate user method', () => {
      expect(userStore.authenticate).toBeDefined();
    });
  });
  describe('Test logic', () => {
    const user = {
      firstName: 'test',
      lastName: 'user',
      userName: 'mohamed1234',
      password: 'test123',
    } as User;

    beforeAll(async () => {
      const createTestUser = await userStore.create(user);
      user.usersID = createTestUser.usersID;
    });
    afterAll(async () => {
      const conn = await client.connect();
      const sql = `DELETE FROM users;`;
      await conn.query(sql);
      conn.release();
    });
    it('Get all users should return all users in the database', async () => {
      const users = await userStore.index();
      expect(users.length).toBe(1);
    });
  });
});
