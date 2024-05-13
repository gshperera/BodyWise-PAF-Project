package com.ds_29.bodywise.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Routine {

    private String name;
    private List<Exercise> exercises;
}
