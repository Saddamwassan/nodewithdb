import express from 'express'
const app = express()
import {getUsers,getUser,createUser,deleteUser,updateUser} from './APIs/users/users.js'
app.use(express.json());

// api routes for users table*************
// sending requests on server 
app.get("/users", async (req,res)=>{
    const users = await getUsers()
    res.send(users)
})
// app.get("/users/:id",async (req,res)=>{
//     const id = req.params.id
//     const user = await getUser(id)
//     res.send(user)
// })
app.get("/users/:id",async (req,res)=>{
    const id = req.params.id
    const user = await getUser(id)
    res.send(user)
})
// post request 
app.post("/createuser",async (req,res)=>{
  // const {firstname,lastname,email,password,usertype_id,active}= req.body
  const data= req.body
  const user = await createUser(data)
  res.status(201).send(" User created successfully!")
})

// updating user 
app.put('/users/:id', async (req, res) => {
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
// delete user 
app.delete("/users/:id",async (req,res)=>{
  const id = req.params.id
  deleteUser(id);
  res.status(200).send("deleted successfully!")
})
// from express official site for error handling 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  app.listen(8000,()=>{
    console.log('Server is running at 8000');
  })