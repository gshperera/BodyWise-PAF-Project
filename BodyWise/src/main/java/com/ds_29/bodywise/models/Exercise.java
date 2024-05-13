package com.ds_29.bodywise.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {

    private String name;
    private int sets;
    private int reps;
}
