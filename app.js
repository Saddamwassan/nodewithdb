import express from 'express'
const app = express()
import { getSchedules, getSchedule, createSchedule, updateShcedule, deleteSchedule} from './APIs/schedules/schedules.js';
import {getUsers,getUser,createUser,deleteUser,updateUser} from './APIs/users/users.js';
import { getBooking } from './APIs/bookings/bookings.js';
app.use(express.json());

// api routes for users table************* // sending requests on server 

  // BEGIN :: Users APIS
      app.get("/users/list", async (req,res)=>{
        const users = await getUsers()
        res.send(users)
      })

      app.get("/users/:id",async (req,res)=>{
        const id = req.params.id
        const user = await getUser(id)
        res.send(user)
      })

      app.post("/users/create",async (req,res)=>{
      // const {firstname,lastname,email,password,usertype_id,active} = req.body
      const data= req.body
      const user = await createUser(data)
      res.status(201).send(" User created successfully!")
      })

      app.put('/users/update/:id', async (req, res) => {
        const id = req.params.id;
        const { firstname, lastname, email, password, usertype_id, active } = req.body;

        try {
            const updateResult = await updateUser(firstname, lastname, email, password, usertype_id, active, id);
            if (updateResult.affectedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.send('Data updated successfully!');
            }
        } catch (error) {
            res.status(500).send('An error occurred while updating the user');
        }
      });

      app.delete("/users/delete/:id",async (req,res)=>{
        const id = req.params.id
        deleteUser(id);
        res.status(200).send("deleted successfully!")
      })
  // END :: Users APIS

    
  // BEGIN :: Schedules APIS
    app.get('/schedules',async (req,res)=>{
      const id = req.params.id
      const schedules = await getSchedules();
      res.send(schedules);
    })
    
    app.get('/schedules/:id',async (req,res)=>{
      const id = req.params.id;
      const schedule = await getSchedule(id);
      res.send(schedule);
    })

    app.post("/schedules/create",async (req,res)=>{
      // const {firstname,lastname,email,password,usertype_id,active} = req.body
      const data= req.body
      await createSchedule(data)
      res.status(201).send(" User created successfully!")
      })

      app.put('/schedules/update/:id', async (req, res) => {
        const id = req.params.id;
        const { fullname,email,message,status_id } = req.body;
        try {
            const updateResult = await updateShcedule(fullname,email,message,status_id, id);
            if (updateResult.affectedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.send('Data updated successfully!');
            }
        } catch (error) {
            res.status(500).send('An error occurred while updating the user');
        }
      });

      app.delete("/schedules/delete/:id",async (req,res)=>{
        const id = req.params.id
        deleteSchedule(id);
        res.status(200).send("deleted successfully!")
      })
    // END :: Schedules APIS

    // BEGIN :: Booking APIS
    app.get('/bookings',async (req,res)=>{
      const id = req.params.id
      const schedules = await getBooking();
      res.send(schedules);
    })
    
    app.get('/bookings/:id',async (req,res)=>{
      const id = req.params.id;
      const schedule = await getSchedule(id);
      res.send(schedule);
    })

    app.post("/bookings/create",async (req,res)=>{
      // const {firstname,lastname,email,password,usertype_id,active} = req.body
      const data= req.body
      await createSchedule(data)
      res.status(201).send(" User created successfully!")
      })

      app.put('/bookings/update/:id', async (req, res) => {
        const id = req.params.id;
        const { fullname,email,message,status_id } = req.body;
        try {
            const updateResult = await updateShcedule(fullname,email,message,status_id, id);
            if (updateResult.affectedRows === 0) {
                res.status(404).send('User not found');
            } else {
                res.send('Data updated successfully!');
            }
        } catch (error) {
            res.status(500).send('An error occurred while updating the user');
        }
      });

      app.delete("/bookings/delete/:id",async (req,res)=>{
        const id = req.params.id
        deleteSchedule(id);
        res.status(200).send("deleted successfully!")
      })
  // END :: Bookings APIS
// BEGIN :: from express official site for error handling 
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  app.listen(8000,()=>{
    console.log('Server is running at 8000');
  })
// END :: from express official site for error handling 


