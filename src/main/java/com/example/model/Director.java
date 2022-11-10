package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Director {
    private long id;
    private String director_name;
    private String director_surname;

    private String director;

    public Director(String director_name, String director_surname, String director) {
	    this.director_name = director_name;
	    this.director_surname = director_surname;
        this.director = director;
    }

    public Director(long id, String director) {
        this.id = id;
        this.director = director;
    }

    public Director(String director) {
        this.director = director;
    }
}
