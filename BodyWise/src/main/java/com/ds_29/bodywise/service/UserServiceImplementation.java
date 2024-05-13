package com.ds_29.bodywise.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds_29.bodywise.config.JwtProvider;
import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.repositories.UserRepository;

@Service
public class UserServiceImplementation implements UserService{

    @Autowired
    UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        User newUser = new User();
		newUser.setFname(user.getFname());
		newUser.setLname(user.getLname());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());

        User createdUser = userRepository.save(newUser);

		return createdUser;
    }

    @Override
    public User findUserById(ObjectId id) throws Exception {

            //optional - allow NULL values
            Optional <User> user = userRepository.findById(id);
            
            if(user.isPresent()){
                return user.get();
            }
    
            throw new Exception("User not exist with userId : " + id);
    }

    @Override
    public User finUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User followUser(ObjectId reqUserId, ObjectId userId2) throws Exception{
        User reqUser = findUserById(reqUserId);
        User user2 = findUserById(userId2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowings().add(user2.getId());

        userRepository.save(reqUser);
        userRepository.save(user2);

        return reqUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJwt(String jwt) {
        
        String email = JwtProvider.getEmailFromJwtToken(jwt);

        User user = userRepository.findByEmail(email);
        return user;
    }

}
