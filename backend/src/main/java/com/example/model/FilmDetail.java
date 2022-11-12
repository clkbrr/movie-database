package com.example.model;

import com.example.movie.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilmDetail{

    private Film film;

    private Poster poster;

    private Actor actor;

    private Category category;

    private ArrayList<String> actors;

    private ArrayList<String> categories;

    private Director director;

    private Country country;

    public FilmDetail(Film film, Poster poster, ArrayList<String> actors, ArrayList<String> categories, Director director, Country country) {
        this.film = film;
        this.poster = poster;
        this.actors = actors;
        this.categories = categories;
        this.director = director;
        this.country = country;
    }
}
