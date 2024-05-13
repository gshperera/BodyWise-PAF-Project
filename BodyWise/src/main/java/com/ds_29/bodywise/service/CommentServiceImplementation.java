package com.ds_29.bodywise.service;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_29.bodywise.models.Comment;
import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.models.WorkoutPlan;
import com.ds_29.bodywise.repositories.CommentRepository;
import com.ds_29.bodywise.repositories.WorkoutPlanRepository;

@Service
public class CommentServiceImplementation implements CommentService{
    @Autowired
    UserService userService;
    @Autowired
    WorkoutPlanService workoutPlanService;
    @Autowired
    WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment addComment(Comment comment, ObjectId userId, String workoutId) throws Exception {
        User user = userService.findUserById(userId);

        WorkoutPlan workoutPlan = workoutPlanService.findById(workoutId);

        Comment newComment = new Comment();
        // newComment.setId(comment.getId());
        // newComment.setWorkoutId(workoutId);
        newComment.setUser(user);
        newComment.setMessage(comment.getMessage());
        newComment.setCommentedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(newComment);
        workoutPlan.getComments().add(savedComment);
        workoutPlanRepository.save(workoutPlan);

        return savedComment;
    }

    @Override
    public Comment findById(String id) {
        return commentRepository.findById(id).orElse(null); 
    }

    @Override
    public String deleteComment(String commentId, String workoutId, ObjectId userId) throws Exception {
        Comment comment = findById(commentId);
        WorkoutPlan workout = workoutPlanService.findById(workoutId);

        // check whether user who is commented == who is going to delete
        // user who is posted the post == who is going to delete
        if(!comment.getUser().getId().equals(userId) || !workout.getCreator().getId().equals(userId)){
            throw new Exception("You can't delete this comment");
        }
        
        commentRepository.delete(comment);
        return "Comment deleted successfully!";
    }

    @Override
    public Comment updateComment(ObjectId userId, Comment comment) throws Exception {
        if(!comment.getUser().getId().equals(userId)){
            throw new Exception("You can't change this comment");
        }
        return commentRepository.save(comment);
    }

    @Override
    public Comment likeComment(String commentId, ObjectId userId) throws Exception {
        Comment comment = findById(commentId);
        User user = userService.findUserById(userId);

        if(comment.getLike().contains(user)){
            comment.getLike().remove(user);
        }
        else{
            comment.getLike().add(user);
        }

        return commentRepository.save(comment);
    }

}
