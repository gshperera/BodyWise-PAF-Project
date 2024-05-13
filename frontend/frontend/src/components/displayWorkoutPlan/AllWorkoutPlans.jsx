import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWorkoutPlanAction } from '../../Redux/WorkoutPlan/workoutplan.action';
import { WorkoutPlanCard } from './WorkoutPlanCard'

export const AllWorkoutPlans = () => {

    const dispatch = useDispatch();

    const {workoutPlan} = useSelector(store => store);

    useEffect(() => {
        dispatch(getAllWorkoutPlanAction())
    }, [workoutPlan.newComment])
  return (
    <div style={{backgroundColor:'#272727', width:'100%'}}>
        {workoutPlan.workouts.map((workout, index) => (
            <WorkoutPlanCard key={workout.id} workout={workout}/>
        ))}
    </div>
  )
}
