package com.ds_29.bodywise.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.models.WorkoutPlan;
import com.ds_29.bodywise.service.UserService;
import com.ds_29.bodywise.service.WorkoutPlanService;

@RestController
@RequestMapping("/workout-plan")
@CrossOrigin("http://localhost:5173")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestHeader("Authorization") String jwt, @RequestBody WorkoutPlan workoutPlan) throws Exception {
        // workoutPlanService.createWorkoutPlan(workoutPlan, userId);
        // return ResponseEntity.ok("Workout Created Successfully!");
        User reqUser = userService.findUserByJwt(jwt);
        WorkoutPlan createdWorkoutPlan = workoutPlanService.createWorkoutPlan(workoutPlan, reqUser.getId());
        return new ResponseEntity<>(createdWorkoutPlan, HttpStatus.ACCEPTED);
    }

    // PUT method to update an existing workout plan by ID
    // @PutMapping("/{workoutId}")
    // public ResponseEntity<?> updateWorkoutPlan(@PathVariable("workoutId") String id, @RequestBody WorkoutPlan updatedWorkoutPlan) {
    //     WorkoutPlan existingWorkoutPlan = workoutPlanService.findById(id);
    //     if (existingWorkoutPlan == null) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     updatedWorkoutPlan.setId(id); // Ensure the ID remains the same
    //     WorkoutPlan updatedPlan = workoutPlanService.updateWorkoutPlan(updatedWorkoutPlan);
    //     return ResponseEntity.ok(updatedPlan);
    // }
    @PutMapping("/{workoutId}")
    public ResponseEntity<?> updateWorkoutPlan(@RequestHeader("Authorization") String jwt, @PathVariable("workoutId") String id, @RequestBody WorkoutPlan updatedWorkoutPlan) throws Exception {
       
        User reqUser = userService.findUserByJwt(jwt);

        WorkoutPlan existingWorkoutPlan = workoutPlanService.findById(id);
        if (existingWorkoutPlan == null) {
            return ResponseEntity.notFound().build();
        }
        
        updatedWorkoutPlan.setId(id); // Ensure the ID remains the same
        updatedWorkoutPlan.setCreator(existingWorkoutPlan.getCreator());
        WorkoutPlan updatedPlan = workoutPlanService.updateWorkoutPlan(reqUser.getId(),updatedWorkoutPlan);
        return ResponseEntity.ok(updatedPlan);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutPlan>> findAllWorkoutPlans(){

        List<WorkoutPlan> workoutplans = workoutPlanService.findAllWorkouts();
        return ResponseEntity.ok(workoutplans);
    }

    
    @DeleteMapping("/{workoutId}")
    public ResponseEntity<?> deleteWorkoutPlan(@RequestHeader("Authorization") String jwt, @PathVariable("workoutId") String workoutId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        String message = workoutPlanService.deleteWorkoutPlan(reqUser.getId(), workoutId);
        // return ResponseEntity.ok("Workout Plan Deleted Successfully!");
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // GET method to retrieve a workout plan by ID
    @GetMapping("/{workoutId}")
    public ResponseEntity<?> getWorkoutPlanById(@PathVariable("workoutId") String id) throws Exception {
        WorkoutPlan workoutPlan = workoutPlanService.findById(id);
        if (workoutPlan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(workoutPlan);
    }

    @GetMapping("/user")
    public ResponseEntity<List<WorkoutPlan>> getWorkoutPlanByUserId(@RequestHeader("Authorization") String jwt) {
        User reqUser = userService.findUserByJwt(jwt);
        List<WorkoutPlan> workoutPlans = workoutPlanService.findWorkoutByUserId(reqUser.getId());
        if (workoutPlans == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(workoutPlans);
    }

    @GetMapping("/search")
    public List<WorkoutPlan> searchUser(@RequestParam("query") String query){
        List<WorkoutPlan> workoutPlans = workoutPlanService.searchWorkoutPlans(query);
        return workoutPlans;
    }

    @PutMapping("/like/{workoutId}")
    public void like(@RequestHeader("Authorization") String jwt, @PathVariable("workoutId") String id) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        
        workoutPlanService.like(id, reqUser.getId());
    }
}
