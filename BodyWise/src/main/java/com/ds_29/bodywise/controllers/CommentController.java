package com.ds_29.bodywise.controllers;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds_29.bodywise.models.Comment;
import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.service.CommentService;
import com.ds_29.bodywise.service.UserService;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

    @PostMapping("/{workoutId}")
    public ResponseEntity<Comment> createComment(@RequestHeader("Authorization") String jwt, @PathVariable("workoutId") String workoutId, @RequestBody Comment comment) throws Exception{
        User reqUser = userService.findUserByJwt(jwt);
        // commentService.addComment(comment, reqUser.getId(), workoutId);
        Comment savedComment = commentService.addComment(comment, reqUser.getId(), workoutId);
        // return ResponseEntity.ok("Add a comment");
        return ResponseEntity.ok(savedComment);
    }

    @DeleteMapping("{commentId}/{userId}/{workoutId}")
    public ResponseEntity<?> deleteWorkoutPlan(@PathVariable("commentId") String commentId, @PathVariable("userId") ObjectId userId, @PathVariable("workoutId") String workoutId) throws Exception {
        commentService.deleteComment(commentId, workoutId, userId);
        return ResponseEntity.ok("Comment is deleted!");
    }

    @PutMapping("{commentId}/{userId}")
    public ResponseEntity<?> updateWorkoutPlan(@PathVariable("userId") ObjectId userId, @PathVariable("commentId") String commentId, @RequestBody Comment updatedComment) throws Exception {
        Comment existingComment = commentService.findById(commentId);
        if (existingComment == null) {
            return ResponseEntity.notFound().build();
        }
        
        updatedComment.setId(commentId); // Ensure the ID remains the same
        updatedComment.setUser(existingComment.getUser());
        Comment newComment = commentService.updateComment(userId,updatedComment);
        return ResponseEntity.ok(newComment);
    }

    @PutMapping("/like/{commentId}")
    public void like(@RequestHeader("Authorization") String jwt, @PathVariable("commentId") String commentId) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        commentService.likeComment(commentId, reqUser.getId());
    }
    
}
