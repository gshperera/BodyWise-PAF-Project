package com.ds_29.bodywise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
// @ComponentScan(basePackages = {"com.ds_29.controllers", "com.ds_29.repositories"})
@RestController
public class BodywiseApplication {

	public static void main(String[] args) {
		SpringApplication.run(BodywiseApplication.class, args);
	}

	@GetMapping
	public String hello(){
		return "Welcome to BodyWise";
	}

}
