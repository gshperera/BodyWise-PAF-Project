package com.ds_29.bodywise.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ds_29.bodywise.models.Comment;

public interface CommentRepository extends MongoRepository<Comment, String>{

}
