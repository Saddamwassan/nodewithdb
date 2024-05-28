import express from 'express'
const app = express()
import {getUsers,getUser,createUser,deleteUser} from './index.js'
app.use(express.json());
// sending requests on server 
app.get("/users", async (req,res)=>{
    const users = await getUsers()
    res.send(users)
})
app.get("/users/:id",async (req,res)=>{
    const id = req.params.id
    console.log(id);
    const user = await getUser(id)
    res.send(user)
})
// post request 
app.post("/createuser",async (req,res)=>{
  const {firstname,lastname,email,password,usertype_id,active}= req.body
  const user = await createUser(firstname,lastname,email,password,usertype_id,active)
  res.status(201).send(user)
})
// delete user 
app.
// from express official site for error handling 
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  app.listen(8000,()=>{
    console.log('Server is running at 8000');
  })