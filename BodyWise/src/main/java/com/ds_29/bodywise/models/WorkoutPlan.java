package com.ds_29.bodywise.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "workoutPlan")
public class WorkoutPlan {

    @Id
    private String id;
    private String caption;
    private String image;
    private String video;
    private User creator;
    private List<Routine> routines;
    private List<User> like = new ArrayList<>();
    private LocalDateTime createdTime; 
    private List<Comment> comments = new ArrayList<>();
    
}