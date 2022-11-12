package com.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Country {
    private long id;
    private String country;

    private long film_id;

    public Country(String country, long film_id) {
	this.country = country;
    this.film_id = film_id;
    }

}
