import  express   from "express";
import db from"../db/conn.mjs";
import Photo from '../models/photo.js';
import { ObjectId } from "mongodb";

 const router = express.Router();
 

 //this section will help you get a list of all the records 
 router.get("/",async(req,res)=>
 {
     let collection = await db.collection("photos");
     let results = await collection.find({}).toArray();
     res.send(results).status(200);
 
 });
  
//this section will help you get a single record by id
router.get("/:id",async(req,res)=>{
    let collection=await db.collection("photos");
    let query = {_id: new ObjectId(req.params.id)};
    let result= await collection.findOne(query);

    if(!result) res.send("not found").status(404);
    else res.send(result).status(200);

});
//this section will help you create a new record
router.post("/",async(req,res)=>{
    const {base64}=req.body;
    let newDocument={
        filename: req.body.filename,
    };
    let collection =await db.collection("photos");
   
    let result =await collection.insertOne(newDocument);
    res.send(result).status(204);
});
//this section will help you update a record by id
router.patch("/:id",async(req,res)=>{
    
    const query ={_id: new ObjectId(req.params.id)};
    const updates={
        $set:{
            //request body
        filename: req.body.filename,
        }
    };
    let collection=await db.collection("photos");
    let result =await collection.updateOne(query,updates);
    res.send(result).status(200);

});
//this section will help you delete a record
router.delete("/delete/:id",async(req,res)=>{
    const query={_id: new ObjectId(req.params.id)};
    const collection=db.collection('photos');
    let result=await collection.deleteOne(query);
    res.send(result).status(200);
});
export default router;