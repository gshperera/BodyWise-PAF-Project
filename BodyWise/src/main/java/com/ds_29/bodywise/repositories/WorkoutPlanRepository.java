package com.ds_29.bodywise.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ds_29.bodywise.models.WorkoutPlan;

public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, String>{

    @Query("SELECT w FROM WorkoutPlan w where w.caption LIKE %:query%")
    public List<WorkoutPlan> searchWorkoutPlans(@Param("query") String query);

    // @Query("select p from WorkoutPlan p where p.creator.id= :userId")
    // List<WorkoutPlan> findWorkoutPlanByUserId(ObjectId userId);
    @Query("{'creator.id': ?0}")
    public List<WorkoutPlan> findWorkoutPlanByUserId(ObjectId userId);
}
