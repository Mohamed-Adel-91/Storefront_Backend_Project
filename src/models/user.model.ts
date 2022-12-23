import User from "../types/user.type";
import client from "../database"
import config from "../config";
import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.salt}`, salt);
};
class userModel {
    //create user
  async create (u:User): Promise<User> {
    try{
        //open conn with DB
        const conn = await client.connect();
        const sql = `INSERT INTO users (firstName, lastName, password)
        VALUES ($1, $2, $3) RETURNING usersID, firstName, lastName`;
        // run query
        const result = await conn.query(sql, [
            u.firstName,
            u.lastName,
            hashPassword(u.password),
        ]);
        // release conn
        conn.release();
        // return create user
        return result.rows[0];

    }catch(error){
        throw new Error(
        `You can't create user
        ${u.firstName}-${u.lastName}:
        ${(error as Error).message}.!!`);
    }
   }
    // get all users
  async getAllUsers(): Promise<User[]>{
    try {
      const conn = await client.connect();
      const sql = `SELECT usersID, firstName, lastName FROM users`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error (`Error found : ${(error as Error).message}`)
    }
  }
    // get specific user
  async getOneUser(usersID: number): Promise<User>{
      try {
        const conn = await client.connect();
        const sql = `SELECT usersID, firstName, lastName FROM users WHERE usersID=($1)`;
        const result = await conn.query(sql, [usersID]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error (`Error can't find user ${usersID} : ${(error as Error).message}`)
      }
    }
    // update user
  async updateOneUser(u: User): Promise<User>{
      try {
        const conn = await client.connect();
        const sql = `UPDATE users SET firstName=$1, lastName=$2, password=$3 WHERE usersID=$4 RETURNING *`;
        const result = await conn.query(sql, [
          u.firstName,
          u.lastName,
          hashPassword(u.password),
          u.usersID,
        ]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error (`Error can't update user ${u.usersID} : ${(error as Error).message}`)
      }
    }
    // delete user
  async deleteOneUser(usersID: number): Promise<User>{
      try {
        const conn = await client.connect();
        const sql = `DELETE FROM users WHERE usersID=($1) RETURNING usersID, firstName, lastName`;
        const result = await conn.query(sql, [usersID]);
        conn.release();
        return result.rows[0];
      } catch (error) {
        throw new Error (`Error can't delete user ${usersID} : ${(error as Error).message}`)
      }
    }
    // authenticate user
  async authenticate(usersID: string, password: string): Promise<User | null>{
      try {
        const conn = await client.connect();
        const sql = 'SELECT password FROM users WHERE usersID=$1';
        const result = await conn.query(sql, [usersID]);
        if(result.rows.length){
          const {password: hashPassword}= result.rows[0];
          const PasswordValidate = bcrypt.compareSync(
            `${password}${config.pepper}`,hashPassword
          );
          if(PasswordValidate){
            const userInfo = await conn.query(
              'SELECT usersID, firstName, lastName FROM users WHERE usersID=($1)',[usersID]
            );
            return userInfo.rows[0];
          }
        }
        conn.release();
        return null;
      } catch (error) {
        throw new Error (`Error can't login this user : ${(error as Error).message}`)
      }
    } 
    // reset password
}


export default userModel;