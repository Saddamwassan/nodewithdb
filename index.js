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
async function getUsers(id){
    const [rows] = await pool.query('SELECT * from users')
    // const row = result[0];
    // console.log(row);
    return rows
}
async function getUser(id){
    const [rows] = await pool.query(`
    SELECT * 
    from users 
    where id= ?`,[id])
    // return rows
    return rows[0]

}

const user = await getUser(2)
console.log(user);