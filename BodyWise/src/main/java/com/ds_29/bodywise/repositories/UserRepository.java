package com.ds_29.bodywise.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ds_29.bodywise.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId>{

    public User findByEmail(String email);

    @Query("select * from User u where u.fname LIKE %:keyword% OR u.lname LIKE %:keyword% OR u.email LIKE %:keyword%")
    public List<User> searchUser(@Param("keyword") String query);
}
