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
public class Film {
    private long id;
    private String title;
    private String description;
    private int release_year;

    private long director_id;

    private long country_id;

    private double imdb;

    private String poster;

    private String actor;

    private List<String> categories;

    private String director;

    private String country;

    public Film(long id, String title, String description, int release_year) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.release_year = release_year;
    }

    public Film(long id, String title, String description, int release_year, String poster, String actor, List<String> categories, String director, String country, double imdb) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.release_year = release_year;
        this.poster = poster;
        this.actor = actor;
        this.categories = categories;
        this.director = director;
        this.country = country;
        this.imdb = imdb;
    }
}
