package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Favourite {
    private long id;

    private long film_id;
    private String movie_id;

    private String actors;

    private String director;

    private String year;

    public Favourite(String movie_id) {
       this.movie_id = movie_id;
    }

    public Favourite(long film_id, String movie_id, String actors, String director, String year) {
        this.film_id = film_id;
        this.movie_id = movie_id;
        this.actors = actors;
        this.director = director;
        this.year = year;
    }
}
