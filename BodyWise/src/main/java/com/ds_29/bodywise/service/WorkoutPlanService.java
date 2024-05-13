package com.ds_29.bodywise.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.ds_29.bodywise.models.WorkoutPlan;

public interface WorkoutPlanService {
    // public WorkoutPlan createWorkoutPlan(WorkoutPlan workout);
    public WorkoutPlan createWorkoutPlan(WorkoutPlan workout, ObjectId userId) throws Exception;

    public List<WorkoutPlan> findAllWorkouts();

    public List<WorkoutPlan> findWorkoutByUserId(ObjectId userId);

    public WorkoutPlan findById(String workoutId) throws Exception;

    public WorkoutPlan updateWorkoutPlan(ObjectId userId, WorkoutPlan workout) throws Exception;

    // public String deleteWorkoutPlan(Integer workoutId);
    public String deleteWorkoutPlan(ObjectId userId, String workoutId) throws Exception;

    public WorkoutPlan like(String workoutId, ObjectId userId) throws Exception;

    public List<WorkoutPlan> searchWorkoutPlans(String query);

    

    
}
