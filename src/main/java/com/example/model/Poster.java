package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Poster {
    private long id;
    private String path;
    private String name;
    private long film_id;

    public Poster(String path, long film_id) {
        this.path = path;
        this.film_id = film_id;
    }
}
