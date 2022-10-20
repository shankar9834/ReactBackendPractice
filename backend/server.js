require('dotenv').config();

const express=require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const workouts=require('./router/workouts');

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method);
   
    next();
})



app.use('/api/workouts',workouts);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('connected to database and listening on port ',process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})

