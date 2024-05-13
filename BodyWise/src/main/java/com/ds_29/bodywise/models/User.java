package com.ds_29.bodywise.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "user")
@Data //getters and setters for all properties
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private ObjectId id;
    private String fname;
    private String lname;
    private String email;
    private String password;
    private String gender;
    private List<ObjectId> followers = new ArrayList<>();
    private List<ObjectId> followings = new ArrayList<>();
}
