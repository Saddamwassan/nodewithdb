import {pool} from '../connection'
// get booking list 
export async function getBookings() {
    const [rows] = await pool.query('SELECT * from bookings')
    return rows
}
// get booking list 
export async function getBooking(id){
    const [rows] = await pool.query('SELECT * from bookings where id = ?',[id])
    return rows[0];
}
// / create schedule 
export async function createBooking(data){
    const { title ,description, duration, link} = data
    const [result] = await pool.query(
        `INSERT INTO bookings (title ,description, duration, link)
        VALUES (?,?,?,?)
        `, [title ,description, duration, link]);
}
// update schedule 
export async function updateBookings(title ,description, duration, link){
    try {
        const update = await pool.query(
            `UPDATE bookings SET title = ? ,description = ? ,duration = ? ,link = ? WHERE id = ?`,
            [title ,description, duration, link, id]
        );
        return update;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
// delete schedule 
export async function deleteBookings(id) {
    const row = await pool.query(`
    DELETE from bookings Where id = ?`, [id])
    return row;
}