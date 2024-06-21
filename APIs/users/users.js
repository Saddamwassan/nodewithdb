import { pool } from '../connection.js';
import bcrypt from 'bcrypt';
export async function getUsers() {
    const [rows] = await pool.query('SELECT * from users')
    return rows
}
// get single user 
export async function getUser(id) {
    const [rows] = await pool.query(`SELECT * from users where id= ?`, [id])
    return rows[0];
}
// create user 
export async function createUser(data){
    const { firstname, lastname, email, password, usertype_id, active } = data
    const hashedPassword = await bcrypt.hash(password,10);
    pool.query(
        `INSERT INTO users (firstname,lastname,email,password,usertype_id,active)
        VALUES (?,?,?,?,?,?)
        `, [firstname, lastname, email, hashedPassword, usertype_id, active]);
}
// update user 
export async function updateUser(firstname, lastname, email, password, usertype_id, active, id) {
    try {
        const update = await pool.query(
            `UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, usertype_id = ?, active = ? WHERE id = ?`,
            [firstname, lastname, email, password, usertype_id, active, id]
        );
        return update;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
// delete user 
export async function deleteUser(id){
    const row = await pool.query(`
    DELETE from users Where id = ?`, [id])
}

export async function loginUser(data){
  const{email,password} = data;
  const hashedPassword = await bcrypt.hash(password,10);
  const [rows] = await pool.query('SELECT * FROM users where email= ? AND password = ? ',[email,hashedPassword]);
  return rows;
}
// store token 
export async function storeToken(token){
  
}
// delete token 
export async function deleteToken(){
}