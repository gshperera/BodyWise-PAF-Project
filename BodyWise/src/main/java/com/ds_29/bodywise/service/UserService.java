package com.ds_29.bodywise.service;

import java.util.List;

import org.bson.types.ObjectId;

import com.ds_29.bodywise.models.User;

public interface UserService {

    public User registerUser(User user);

    public User findUserById(ObjectId id) throws Exception;

    public User finUserByEmail(String email);

    public User followUser(ObjectId user1, ObjectId user2) throws Exception;

    public List<User> searchUser(String query);

    public User findUserByJwt(String jwt);
}
