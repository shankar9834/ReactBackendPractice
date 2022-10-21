import {useEffect, useState} from "react"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
      
    const [workouts,setWorkouts]=useState(null);
   
    useEffect(()=>{
      const fetchWorkouts=async()=>{
         const response=await fetch('/api/workouts');
       // console.log(response);
         const json=await response.json();
         console.log(json);

         if(response.ok)
         {
           setWorkouts(json);
         }


      } 
      
      fetchWorkouts();


    },[])


  return (
    <div className="home">
      <div className="workouts">
        {workouts&&workouts.map((workout)=>{
         return ( <WorkoutDetails workout={workout} key={workout._id} />)
        })}
      </div>
      <WorkoutForm/>

    </div>
  )
}

export default Home