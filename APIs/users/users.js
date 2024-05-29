import { pool } from '../connection.js'
export async function getUsers() {
    const [rows] = await pool.query('SELECT * from users')
    // const row = result[0];
    // console.log(row);
    return rows
}
// get single user 
export async function getUser(id) {
    const [rows] = await pool.query(`SELECT * from users where id= ?`, [id])
    return rows[0];
}
export async function createUser(data) {
    const { firstname, lastname, email, password, usertype_id, active } = data
    const [result] = await pool.query(
        `INSERT INTO users (firstname,lastname,email,password,usertype_id,active)
        VALUES (?,?,?,?,?,?)
        `, [firstname, lastname, email, password, usertype_id, active]);
    const id = result.insertId;
    return getUser(id);
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
export async function deleteUser(id) {
    const row = await pool.query(`
    DELETE from users Where id = ?`, [id])
}