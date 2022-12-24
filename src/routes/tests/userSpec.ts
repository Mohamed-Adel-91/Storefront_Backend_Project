import userModel from '../../models/user.model';
import client from '../../database';
import User from '../../types/user.type';

const UserModel = new userModel();

describe('UserModels', () => {
  describe('Test Methods', () => {
    it('Get all users method', () => {
      expect(UserModel.getAllUsers).toBeDefined();
    });
    it('Get one user method', () => {
      expect(UserModel.getOneUser).toBeDefined();
    });
    it('create one user method', () => {
      expect(UserModel.create).toBeDefined();
    });
    it('Update one user method', () => {
      expect(UserModel.updateOneUser).toBeDefined();
    });
    it('Delete one user method', () => {
      expect(UserModel.deleteOneUser).toBeDefined();
    });
    it('Authenticate user method', () => {
      expect(UserModel.authenticate).toBeDefined();
    });
  });
  describe('Test logic', () => {
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

    it('Create method should return a new user', async () => {
      const createdUser = await UserModel.create({
        firstName: 'test2',
        lastName: 'user2',
        password: 'test123',
      } as User);
      expect(createdUser).toEqual({
        usersID: createdUser.usersID,
        firstName: 'test2',
        lastName: 'user2',
        password: 'test123',
      } as User);
    });
    it('Get all users should return all users in the database', async () => {
      const users = await UserModel.getAllUsers();
      expect(users.length).toBe(2);
    });
    it('Get one user should return same user called in the database', async () => {
      const userCalled = await UserModel.getOneUser(
        user.usersID as unknown as number
      );
      expect(userCalled.usersID).toBe(user.usersID);
      expect(userCalled.firstName).toBe(user.firstName);
      expect(userCalled.lastName).toBe(user.lastName);
      expect(userCalled.password).toBe(user.password);
    });
  });
});
