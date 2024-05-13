import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../api/axiosConfig'
import { SideBar } from '../../components/sideBar/SideBar';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../Redux/Auth/auth.action';
import { store } from '../../Redux/store';
import { Route, Routes } from 'react-router-dom';
import { Profile } from '../../components/profile/Profile';
import { AllWorkoutPlans } from '../../components/displayWorkoutPlan/AllWorkoutPlans';
import { UsersWorkoutPlans } from '../../components/displayWorkoutPlan/UsersWorkoutPlans';



export const Home = () => {

    const [workoutPlans, setWorkoutPlans] = useState();

    // const dispatch = useDispatch();
    // const jwt = localStorage.getItem("jwt");

    //accessing store
    const {auth} = useSelector(store => store);
    console.log("auth....", auth)

    // useEffect(()=>{
    //     dispatch(getProfileAction(jwt));
    // },[])

    // const getWorkoutPlans = async()=>{
    //     try {

    //         const response = await axios.get(`${API_BASE_URL}/workout-plan`)
    //         console.log(response.data)
    //         setWorkoutPlans(response.data)
            
    //     } catch (error) {
    //         console.log(error);
    //     }
        
    // }

    // useEffect(()=>{
    //     getWorkoutPlans();
    // },[])

  return (
    // <SideBar/>
    // <Hero workoutPlans={workoutPlans}/>
    // <WorkoutPlanCard workoutPlans={workoutPlans}/>
    // <WorkoutPlanCard/>
    <Grid container spacing={0}>
            <Grid item xs={0} lg={3} >
                <div className='sticky top-0'>
                    <SideBar/>
                </div>
            </Grid>
            <Grid item className='flex justify-center px-10' sx={{backgroundColor:"#272727"}} xs={12} lg={9}>
                <Routes>
                    {/* <Route path='/' element={<WorkoutPlanCard workoutPlans={workoutPlans}/>}/> */}
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/' element={<AllWorkoutPlans/>}/>
                    <Route path='/workout-plans' element={<UsersWorkoutPlans/>}/>
                </Routes>
                
            </Grid>
        </Grid>
  )
}
