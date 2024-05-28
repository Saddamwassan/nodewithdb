import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env.DB_HOST)
const pool = mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE  
        // host:'localhost',
        // user:'root',
        // password:'',
        // database:'booking_db'  
     }
).promise();    
export async function getUsers(id){
    const [rows] = await pool.query('SELECT * from users')
    // const row = result[0];
    // console.log(row);
    return rows
}
// get single user 
export async function getUser(id){
    const [rows] = await pool.query(`
    SELECT * 
    from users 
    where id= ?`,[id])
    // return rows
    return rows[0];
}
export async function createUser(firstname,lastname,email,password,usertype_id,active){
const [result] = await pool.query(
    `INSERT INTO users (firstname,lastname,email,password,usertype_id,active)
    VALUES (?,?,?,?,?,?)
    `,[firstname,lastname,email,password,usertype_id,active]);
const id = result.insertId;
return getUser(id);
}

// delete user 
export async function deleteUser(id){
    const row = await pool.query(`
    DELETE from users Where id = ?`,[id])
}
// const result = await createUser('Tariq','jameel','bilalanwar@gmail.com','lsdkf',"2","1");
// console.log(result);
