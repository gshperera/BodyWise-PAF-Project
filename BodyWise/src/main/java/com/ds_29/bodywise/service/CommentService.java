package com.ds_29.bodywise.service;

import org.bson.types.ObjectId;

import com.ds_29.bodywise.models.Comment;

public interface CommentService {

    public Comment addComment(Comment comment, ObjectId userId, String workoutId) throws Exception;

    public Comment findById(String id);

    public String deleteComment(String commentId, String workoutId, ObjectId userId) throws Exception;

    public Comment updateComment(ObjectId userId, Comment comment) throws Exception;

    public Comment likeComment(String commentId, ObjectId userId) throws Exception;
}
