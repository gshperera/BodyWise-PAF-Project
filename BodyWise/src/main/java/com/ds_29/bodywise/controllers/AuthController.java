package com.ds_29.bodywise.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds_29.bodywise.config.JwtProvider;
import com.ds_29.bodywise.models.User;
import com.ds_29.bodywise.repositories.UserRepository;
import com.ds_29.bodywise.requests.LoginRequest;
import com.ds_29.bodywise.response.AuthResponse;
import com.ds_29.bodywise.service.AppUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserDetailsService appUserDetails;

    @PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception{

        User isExist = userRepository.findByEmail(user.getEmail());

        if(isExist != null){
            throw new Exception("This email is already used!");
        }
		User newUser = new User();
		newUser.setFname(user.getFname());
		newUser.setLname(user.getLname());
		newUser.setEmail(user.getEmail());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User createdUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(createdUser.getEmail(), createdUser.getPassword());
        String token = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, "Register Success");

		return res;
	}

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest){

        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        String token = JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, "Login Success");

		return res;
    }

    private Authentication authenticate(String email, String password){

        UserDetails userDetails = appUserDetails.loadUserByUsername(email);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid Username!");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Password is not matched!");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
