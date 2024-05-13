import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWorkoutPlanAction, getUserWorkoutPlanAction } from '../../Redux/WorkoutPlan/workoutplan.action';
import { WorkoutPlanCard } from './WorkoutPlanCard'

export const UsersWorkoutPlans = () => {

    const dispatch = useDispatch();

    const {workoutPlan} = useSelector(store => store);

    useEffect(() => {
        dispatch(getUserWorkoutPlanAction())
    }, [dispatch])
  return (
    <div style={{backgroundColor:'#272727', width:'100%'}}>
        {workoutPlan.workouts.map((workout, index) => (
            <WorkoutPlanCard key={workout.id} workout={workout}/>
        ))}
    </div>
  )
}
