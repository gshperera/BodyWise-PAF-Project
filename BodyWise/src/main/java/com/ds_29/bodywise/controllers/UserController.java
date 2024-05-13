package com.ds_29.bodywise.controllers;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.repositories.UserRepository;
import com.ds_29.bodywise.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    // @PostMapping
	// public User createUser(@RequestBody User user){
	// 	User createdUser = userService.registerUser(user);
    //     return createdUser;
	// }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable("userId") ObjectId id) throws Exception{
        User user = userService.findUserById(id);
        return user;
    }

    @PutMapping("/api/follow/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable ObjectId userId2) throws Exception{

        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(), userId2);
        return user;
    }

    @GetMapping("/users/search")
    public List<User> searchUser(@RequestParam("query") String query){
        List<User> users = userService.searchUser(query);
        return users;
    }

	@GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();

    }


    @GetMapping("/api/user/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt){
        // System.out.println("jwt------------" + jwt);
        // return null;
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }

}
