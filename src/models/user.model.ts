import User from "../types/user.type";
import client from "../database"
class userModel {
    //create user
   async create (u:User): Promise<User> {
    try{
        //open conn with DB
        const conn = await client.connect();
        const sql = `INSERT INTO users (firstName, lastName, password)
        values ($1, $2, $3) returning usersID, firstName, lastName`;
        // run query
        const result = await conn.query(sql, [
            u.firstName,
            u.lastName,
            u.password
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
    // get specific user
    // update user
    // delete user
    // authenticate user
    // reset password
}


export default userModel;