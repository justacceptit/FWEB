import  express   from "express";
import db from"../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
 //this section will help you get a list of all the records 
 router.get("/1",async(req,res)=>
{
    let collection = await db.collection("timetable");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);


});
//this section will help you get a single record by id
router.get("/:id",async(req,res)=>{
    let collection=await db.collection("timetable");
    let query = {_id: new ObjectId(req.params.id)};
    let result= await collection.findOne(query);

    if(!result) res.send("not found").status(404);
    else res.send(result).status(200);

});

//this section will help you create a new record
router.post("/",async(req,res)=>{
 
    let newDocument={
       week:req.body.week,
    
       day1:req.body.day1,
       time1:req.body.time1,
       day2:req.body.day2,
       time2:req.body.time2,
       day3:req.body.day3,
       time3:req.body.time3,
       day4:req.body.day4,
       time4:req.body.time4,
       day5:req.body.day5,
       time5:req.body.time5,
    };
    let collection =await db.collection("timetable");
   
    let result =await collection.insertOne(newDocument);
    res.send(result).status(204);
});
//this section will help you update a record by id
router.patch("/:id",async(req,res)=>{
    
    const query ={_id: new ObjectId(req.params.id)};
    const updates={
        $set:{
            //request body
            week:req.body.week,
            
            day1:req.body.day1,
            time1:req.body.time1,
            day2:req.body.day2,
            time2:req.body.time2,
            day3:req.body.day3,
            time3:req.body.time3,
            day4:req.body.day4,
            time4:req.body.time4,
            day5:req.body.day5,
            time5:req.body.time5,
        }
    };
    let collection=await db.collection("timetable");
    let result =await collection.updateOne(query,updates);
    res.send(result).status(200);

});
//this section will help you delete a record
router.delete("/:id",async(req,res)=>{
    const query={_id: new ObjectId(req.params.id)};
    const collection=db.collection('timetable');
    let result=await collection.deleteOne(query);
    res.send(result).status(200);
});
export default router;