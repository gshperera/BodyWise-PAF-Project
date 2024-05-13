package com.ds_29.bodywise.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.models.WorkoutPlan;
import com.ds_29.bodywise.repositories.WorkoutPlanRepository;

@Service
public class WorkoutPlanServiceImplementation implements WorkoutPlanService{

    @Autowired
    WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    UserService userService;
    // @Override
    // public WorkoutPlan createWorkoutPlan(WorkoutPlan workout) {
    //     return workoutPlanRepository.save(workout);
    // }
    @Override
    public WorkoutPlan createWorkoutPlan(WorkoutPlan workout, ObjectId userId) throws Exception {
        User user = userService.findUserById(userId);

        WorkoutPlan workoutPlan = new WorkoutPlan();
        workoutPlan.setId(workout.getId());
        workoutPlan.setCaption(workout.getCaption());
        workoutPlan.setImage(workout.getImage());
        workoutPlan.setVideo(workout.getVideo());
        workoutPlan.setCreator(user);
        workoutPlan.setRoutines(workout.getRoutines());
        workoutPlan.setCreatedTime(LocalDateTime.now());

        workoutPlanRepository.save(workoutPlan);

        return workoutPlan;
    }

    // @Override
    // public WorkoutPlan findById(String workoutId) {
    //     return workoutPlanRepository.findById(workoutId).orElse(null);
        
    // }
    @Override
    public WorkoutPlan findById(String workoutId) throws Exception {
        Optional<WorkoutPlan> workoutPlan =  workoutPlanRepository.findById(workoutId); 

        if(workoutPlan.isEmpty()){
            throw new Exception("WorkoutPlan not found with id : " + workoutId);
        }

        return workoutPlan.get();
    }

    // @Override
    // public WorkoutPlan updateWorkoutPlan(WorkoutPlan workout) {
    //     return workoutPlanRepository.save(workout);
    // }
    @Override
    public WorkoutPlan updateWorkoutPlan(ObjectId userId, WorkoutPlan workout) throws Exception {
        if(!workout.getCreator().getId().equals(userId)){
            throw new Exception("You don't have access to update this post!");
        }
        return workoutPlanRepository.save(workout);
    }

    // @Override
    // public String deleteWorkoutPlan(Integer workoutId) {
    //     workoutPlanRepository.deleteById(workoutId);
    //     return "Workout Plan Deleted Successfully!";
    
    // }
    @Override
    public String deleteWorkoutPlan(ObjectId userId, String workoutId) throws Exception {
        WorkoutPlan workout = findById(workoutId);

        ObjectId creatorId = workout.getCreator().getId();

        if(!creatorId.equals(userId)){
            throw new Exception("You don't have access to delete this post");
        }

        workoutPlanRepository.delete(workout);
        return "Workout Plan Deleted Successfully!";
    
    }

    @Override
    public List<WorkoutPlan> searchWorkoutPlans(String query) {
        return workoutPlanRepository.searchWorkoutPlans(query);
    }

    @Override
    public WorkoutPlan like(String workoutId, ObjectId userId) throws Exception {
        WorkoutPlan workout = findById(workoutId);
        User user = userService.findUserById(userId);

        if(workout.getLike().contains(user)){
            workout.getLike().remove(user);
        }
        else{
            workout.getLike().add(user);
        }

        return workoutPlanRepository.save(workout);
    }

    @Override
    public List<WorkoutPlan> findAllWorkouts() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public List<WorkoutPlan> findWorkoutByUserId(ObjectId userId) {
        return workoutPlanRepository.findWorkoutPlanByUserId(userId);
    }

}
