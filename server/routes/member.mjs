import  express   from "express";
import db from"../db/conn.mjs";
import { ObjectId } from "mongodb";
//import { jwtDecode } from "jwt-decode";
const membersRouter = express.Router();
// Google login endpoint
const router = express.Router();
membersRouter.post("/google-login", async (req, res) => {
    try {
      const { googleId, name, email } = req.body;
  
      // Create a new user instance
      const newUser = {
        googleId,
        name,
        email,
      };
  
      // Save the user to MongoDB
      const collection = await db.collection("members");
      const result = await collection.insertOne(newUser);
  
      res.status(201).json(result.ops[0]);
    } catch (error) {
      console.error('Error saving google user to mongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

 //this section will help you get a list of all the records 
 router.get("/",async(req,res)=>
{
    let collection = await db.collection("members");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);

});
//this section will help you get a single record by id
router.get("/:id",async(req,res)=>{
    let collection=await db.collection("members");
    let query = {_id: new ObjectId(req.params.id)};
    let result= await collection.findOne(query);

    if(!result) res.send("not found").status(404);
    else res.send(result).status(200);

});
//login
router.post("/1",async(req,res)=>{
    let document ={
        name:req.body.name, 
        password:req.body.password
    }
    let collection =await db.collection("members");
    let query={name: document.name, password: document.password };
    let result=await collection.findOne(query);
    if(!result) res.send("not found").status(404);
    else res.send(result).status(200);
})
//this section will help you create a new record
router.post("/",async(req,res)=>{
    let date = new Date();
    let dateformat=date.toLocaleDateString();
    //if (!req.body.name || !req.body.email || !req.body.attendance || !req.body.mobile) {
      //  return res.status(400).json({ message: 'All fields are required' });
      //}
    
    let newDocument={
        name: req.body.name,
        password:req.body.password,
        level:req.body.level,
        email: req.body.email,

        attendance: req.body.attendance,
        date: dateformat,
        mobile: req.body.mobile,

    };
    let collection =await db.collection("members");
   
    let result =await collection.insertOne(newDocument);
    res.send(result).status(204);
});
//this section will help you update a record by id
router.patch("/:id",async(req,res)=>{
    
    const query ={_id: new ObjectId(req.params.id)};
    const updates={
        $set:{
            //request body
            name: req.body.name,
            level:req.body.level,
            password:req.body.password,
            email: req.body.email,
            attendance: req.body.attendance,
            date: req.body.date,
            mobile: req.body.mobile,
        }
    };
    let collection=await db.collection("members");
    let result =await collection.updateOne(query,updates);
    res.send(result).status(200);

});
//this section will help you delete a record
router.delete("/:id",async(req,res)=>{
    const query={_id: new ObjectId(req.params.id)};
    const collection=db.collection('members');
    let result=await collection.deleteOne(query);
    res.send(result).status(200);
});
export default router; membersRouter;