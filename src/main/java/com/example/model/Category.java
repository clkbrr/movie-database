package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    private long id;
    private String name;

    private List<String> categories;

    public Category(String name, List<String> categories) {
        this.name = name;
        this.categories = categories;
    }

    public Category(List<String> categories) {
        this.categories = categories;
    }
}
