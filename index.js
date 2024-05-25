import mysql from 'mysql2'
// import dotenv from 'dotenv'
// dotenv.config()
const pool = mysql.createPool(
    {
        // host: process.env.MYSQL_HOST,
        // user: process.env.MYSQL_USER,
        // password: process.env.MYSQL_PASSWORD,
        // database: process.env.MYSQL_DATABASE

        host:'127.0.0.1',
        user: 'root',
        password: '',
        database:'booking_db'   }
).promise();    
async function getUsers(){
    const [row] = await pool.query('SELECT * from users')
    // const row = result[0];
    console.log(row);
}
const users = await getUsers()
console.log(users);