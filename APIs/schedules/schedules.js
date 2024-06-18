import { pool } from '../connection.js'
// get schedule list 
export async function getSchedules() {
    const [rows] = await pool.query('SELECT * from schedules')
    return rows
}
// get single schedule 
export async function getSchedule(id){
    const [rows] = await pool.query('SELECT * from schedules where id = ?',[id])
    return rows[0];
}

// / create schedule 
export async function createSchedule(data) {
        const { fullname, email,schedule_dt, message, status_id} = data
         pool.query(
        `INSERT INTO schedules (fullname, email, schedule_dt, message,status_id)
        VALUES (?,?,?,?,?)
        `, [ fullname, email, schedule_dt, message, status_id]);
}
// update schedule  
export async function updateShcedule(fullname,email,message,status_id,id) {
    try {
        const update = await pool.query(
            `UPDATE schedules SET fullname = ? ,email = ? ,message = ? ,status_id = ? WHERE id = ?`,
            [fullname,email,message,status_id , id]
        );
        return update;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
// delete schedule 
export async function deleteSchedule(id) {
    const row = await pool.query(`
    DELETE from schedules Where id = ?`, [id])
    return row;
}