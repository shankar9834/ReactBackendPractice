const mongoose=require('mongoose');
const Workout=require('../model/workoutModel');


//get all workouts
const getWorkouts=async(req,res)=>
{
     const workout=await Workout.find({}).sort({createdAt: -1});
     res.status(200).json(workout);
}


//get single workout
const getWorkout=async(req,res)=>{

    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'no such workout'});
    }
    
    const workout=await Workout.findById(id);

    if(!workout)
    {
        return res.status(404).json({error:'no such workout'});

    }

     res.status(200).json(workout);

}


//create new workout
const createWorkout=async(req,res)=>{
 
    const {title,reps,load}=req.body;

    try{
      const newWorkout=await Workout({title,reps,load});
      await newWorkout.save();
      res.status(200).json(newWorkout);

    }
    catch(err)
    {
         res.status(400).json({error:err.message});              
    }
 
}

//delete workout

const deleteWorkout=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'no such workout'})
    }

    const workout=await Workout.findOneAndDelete({_id:id});

    if(!workout)
    {
        return res.status(404).json({error:'no such workout'});
    }

    res.status(200).json(workout);
}

//update workout

const updateWorkout=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'no such workout'})
    }

    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body});

    if(!workout)
    {
        return res.status(404).json({error:'no such workout'});
    }

    res.status(200).json(workout);
}


module.exports={
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}
