import express from 'express'
const app = express()
import { getSchedules, getSchedule, createSchedule, updateShcedule, deleteSchedule } from './APIs/schedules/schedules.js';
import { getUsers, getUser, createUser, deleteUser, updateUser,loginUser,storeToken,deleteToken} from './APIs/users/users.js';
import { getBookings, createBooking, getBooking, updateBookings, deleteBookings } from './APIs/bookings/bookings.js';

import cors from 'cors';
import jwt from 'jsonwebtoken';
app.use(cors());
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();

// authentication routes 
let refreshTokens = [];
    //  routes 
  
    // delete token 
    app.delete('/logout',async(req,res)=>{
      deleteToken();
     res.status(200).send("logout successfully!");  
    })
    // token route 
    // refresh token 
    app.post('/token',async (req,res)=>{
      console.log('token api working.')
      console.log(req.body.refToken)

      const refreshToken = req.body.refToken
      if(refreshToken == null) return res.sendStatus(401)
      if(!refreshTokens.includes(refreshToken)) return res.status(403).send("array does not contain refreshtoken")
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
      if(err) return res.sendStatus(403)
      const accessToken = generateAccessToken(user)
      res.json({accessToken:accessToken})
      })
    })
 // login route 
      app.post('/users/login',async (req,res)=>{
        const  data = req.body;
        const checkUser = await loginUser(data);
        const accessToken = generateAccessToken(data);
        const refreshToken = jwt.sign(data,process.env.REFRESH_TOKEN_SECRET);
        const saveToken = await storeToken(refreshToken);
        refreshTokens.push(refreshToken);
        res.json({accessToken: accessToken, refreshToken:refreshToken})
      })  
// BEGIN :: from express official site for error handling 

function generateAccessToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15s'})

}



// BEGIN :: Users APIS
app.get("/users/list", authenticateToken, async (req, res) => {
  const users = await getUsers();
  // res.send(users);
  console.log(users);
  res.json(users.filter(user => user.email === req.user.email));
})
// authentication middleware 
 function authenticateToken(req, res, next) {
  console.log("hi");
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401);
  }
  console.log(token);
  console.log("token: ", process.env.ACCESS_TOKEN_SECRET);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.status(401).send("you cannot access data!");
    req.user = user;
    next() // next() is used to move on from middleware
  })
}

app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

app.post("/users/create", async (req, res) => {
  // const {firstname,lastname,email,password,usertype_id,active} = req.body
  const data = req.body;
  const user = await createUser(data);
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

app.delete("/users/delete/:id", async (req, res) => {
  const id = req.params.id
  deleteUser(id);
  res.status(200).send("deleted successfully!")
})
// // login route 
//   app.post('/users/login',async (req,res)=>{
//   const  data= req.body;
//   const checkUser = await loginUser(data);
//   const accToken = jwt.sign(data,process.env.ACCESS_TOKEN_SECRET)
//   res.json({accessToken: accToken})
//   // res.send(checkUser);
// })  
// END :: Users APIS


// BEGIN :: Schedules APIS
app.get('/schedules', async (req, res) => {
  const id = req.params.id
  const schedules = await getSchedules();
  res.send(schedules);
})

app.get('/schedules/:id', async (req, res) => {
  const id = req.params.id;
  const schedule = await getSchedule(id);
  res.send(schedule);
})

app.post("/schedules/create", async (req, res) => {
  // const {firstname,lastname,email,password,usertype_id,active} = req.body
  const data = req.body
  const schedule = await createSchedule(data)
  res.status(201).send(" Schedule created successfully!")
})

app.put('/schedules/update/:id', async (req, res) => {
  const id = req.params.id;
  const { fullname, email, message, status_id } = req.body;
  try {
    const updateResult = await updateShcedule(fullname, email, message, status_id, id);
    if (updateResult.affectedRows === 0) {
      res.status(404).send('User not found');
    } else {
      res.send('Data updated successfully!');
    }
  } catch (error) {
    res.status(500).send('An error occurred while updating the user');
  }
});

app.delete("/schedules/delete/:id", async (req, res) => {
  const id = req.params.id
  deleteSchedule(id);
  res.status(200).send("deleted successfully!")
})
// END :: Schedules APIS

// BEGIN :: Booking APIS
app.get('/bookings', async (req, res) => {
  const id = req.params.id
  const schedules = await getBookings();
  res.send(schedules);
})

app.get('/bookings/:id', async (req, res) => {
  const id = req.params.id;
  const schedule = await getBooking(id);
  res.send(schedule);
})

app.post("/bookings/create", async (req, res) => {
  // const {firstname,lastname,email,password,usertype_id,active} = req.body
  const data = req.body
  await createBooking(data)
  res.status(201).send(" Booking created successfully!")
})

app.put('/bookings/update/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description, duration, link } = req.body;
  try {
    const updateResult = await updateBookings(title, description, duration, link, id);
    if (updateResult.affectedRows === 0) {
      res.status(404).send('User not found');
    } else {
      res.send('Booking updated!');
    }
  } catch (error) {
    res.status(500).send('An error occurred while updating the user');
  }
});

app.delete("/bookings/delete/:id", async (req, res) => {
  const id = req.params.id
  deleteBookings(id);
  res.status(200).send("Booking deleted!")
})
// END :: Bookings APIS
// BEGIN :: from express official site for error handling 
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
app.listen(8000, () => {
  console.log('Server is running at 8000');
})
// END :: from express official site for error handling 


