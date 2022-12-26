import User from '../types/user.type';
import client from '../database';
import config from '../config';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.salt}`, salt);
};
class userModel {
  // get all users
  async index():Promise<User[]> {
    try{
      const conn = await client.connect();
      const sql = `SELECT * FROM users`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Error found users: ${(error as Error).message}`);
    }
    };
    
  //create user
  async create(u: User): Promise<User> {
    try {
      //open conn with DB
      const conn = await client.connect();
      const sql = `INSERT INTO users (firstName, lastName, userName, password)
        VALUES ($1, $2, $3, $4) RETURNING usersID, firstName, lastName, userName`;
      // run query
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.userName,
        hashPassword(u.password),
      ]);
      // release conn
      conn.release();
      // return create user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `You can't create user ${u.userName}: ${(error as Error).message}.!!`
      );
    }
  }
  
  // get specific user
  async show(usersID: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE usersID=($1)`;
      const result = await conn.query(sql, [usersID]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error can't find user ${usersID} : ${(error as Error).message}`
      );
    }
  }
  // update user
  async update(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET firstName=$1, lastName=$2, userName=$3, password=$4 WHERE usersID=$5 RETURNING *`;
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.userName,
        hashPassword(u.password),
        u.usersID,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error can't update user ${u.usersID} : ${(error as Error).message}`
      );
    }
  }
  // delete user
  async delete(usersID: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM users WHERE usersID=($1) RETURNING usersID, firstName, lastName, userName`;
      const result = await conn.query(sql, [usersID]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Error can't delete user ${usersID} : ${(error as Error).message}`
      );
    }
  }
  // authenticate user
  async authenticate(userName: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE userName=($1)';
      const result = await conn.query(sql, [userName]);
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const PasswordValidate = bcrypt.compareSync(
          `${password}${config.pepper}`,
          hashPassword
        );
        if (PasswordValidate) {
          const userInfo = await conn.query(
            'SELECT usersID, firstName, lastName, userName FROM users WHERE userName=($1)',
            [userName]
          );
          return userInfo.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(
        `Error can't login this user : ${(error as Error).message}`
      );
    }
  }
}

export default userModel;
