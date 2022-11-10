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
public class Actor {
    private long id;
    private String actor_name;
    private String actor_surname;

    private List<String> actors;

    public Actor(String actor_name, String actor_surname, List<String> actors) {
         this.actors = actors;
	     this.actor_name = actor_name;
	     this.actor_surname = actor_surname;
    }

    public Actor(List<String> actors) {
        this.actors = actors;
    }
}
