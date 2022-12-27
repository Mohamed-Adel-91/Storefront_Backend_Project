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

    // it('Create method should return a new user', async () => {
    //   const result  = await userStore.create({
    //     firstName: 'test2',
    //     lastName: 'user2',
    //    userName: 'mohamed1234',
    //     password: 'test123',
    //   } as User);
    //   expect(result).toEqual({
    //     usersID: '1',
    //     firstName: 'test2',
    //     lastName: 'user2',
    //    userName: 'mohamed1234',
    //     password: 'test123',
    //   } as User);
    // });
    // it('index method should return a list of users', async () => {
    //   const result = await  userStore.index();
    //   expect(result).toEqual([{
    //     usersID: "1",
    //     firstName: 'test2',
    //     lastName: 'user2',
    //    userName: 'mohamed1234',
    //     password: 'test123',
    //   }]);
    // });
    // it('show method should return the correct user', async () => {
    //   const result = await userStore.show("1");
    //   expect(result).toEqual({
    //     usersID: "1",
    //     firstName: 'test2',
    //     lastName: 'user2',
    //    userName: 'mohamed1234',
    //     password: 'test123',
    //   });
    // });

    // it('delete method should remove the user', async () => {
    //   userStore.delete(1);
    //   const result = await userStore.index()
    //   expect(result).toEqual([]);
    // });

    // it('Get one user should return same user called in the database', async () => {
    //   const userCalled = await userStore.show(
    //     user.usersID as unknown as string
    //   );
    //   expect(userCalled.usersID).toBe(user.usersID);
    //   expect(userCalled.firstName).toBe(user.firstName);
    //   expect(userCalled.lastName).toBe(user.lastName);
    //   expect(userCalled.userName).toBe(user.userName);
    //   expect(userCalled.password).toBe(user.password);
    // });
  });
});
