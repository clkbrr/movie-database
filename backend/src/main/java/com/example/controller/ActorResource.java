package com.example.controller;

import com.example.repository.ActorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "actor")
public class ActorResource {

    @Autowired
    public ActorRepo actorRepo;

	@CrossOrigin(origins = "http://locahost:8000")
	@GetMapping(path = "getfilmLike", produces = MediaType.APPLICATION_JSON_VALUE)
	public void findByLike(@RequestParam String expression) {
		// localhost:8080/actor/getfilmLike?expression=Al
		//ArrayList<Film> filmList = (ArrayList<Film>) actorRepo.getFilmsLike(expression);
		//return filmList;
	}

    /*@GetMapping(path = "getall", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<Actor> getAll() {
	// localhost:8080/actor/getall
	ArrayList<Actor> actorList = (ArrayList<Actor>) actorRepo.getAll();
	return actorList;
    }*/

    /*@GetMapping(path = "getbyid/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Actor getById(@PathVariable long id) {
	// localhost:8080/actor/getbyid/1
	Actor actor = actorRepo.getById(id);
	return actor;
    }*/

    /*@GetMapping(path = "findbyname/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<Actor> findByName(@PathVariable String name) {
	// localhost:8080/actor/findbyname/Kate
	ArrayList<Actor> actorList = (ArrayList<Actor>) actorRepo.findByName(name);
	return actorList;
    }

    @GetMapping(path = "findbynamelike", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<Actor> findByNameLike(@RequestParam String expression) {
	// localhost:8080/actor/findbynamelike?expression=Le
	ArrayList<Actor> actorList = (ArrayList<Actor>) actorRepo.findByNameLike(expression);
	return actorList;
    }*/

    /*@GetMapping(path = "getfilms", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<Film> getFilms(@RequestParam String name) {
	// localhost:8080/actor/getfilms?name=Kate Winslet
	ArrayList<Film> filmList = (ArrayList<Film>) actorRepo.getFilms(name);
	return filmList;
    }*/

    /*@PostMapping(path = "save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> save(@RequestBody Actor actor) {
	boolean isSaved = actorRepo.save(actor);
	// localhost:8080/actor/save
	if (isSaved) {
	    return ResponseEntity.status(HttpStatus.OK)
		    .body(actor.getActor_name() + " " + actor.getActor_surname() + " isimli aktor basariyla eklendi");
	}
	else {
	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Aktor eklenemedi");
	}
    }

    @PostMapping(path = "insert", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> insert(@RequestBody Actor actorr) {
	actorRepo.save(actorr);
	return ResponseEntity.status(HttpStatus.CREATED).body("Başarılı - 201");
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
	boolean isDeleted = actorRepo.delete(id);
	// localhost:8080/actor/delete/4
	if (isDeleted) {
	    return ResponseEntity.status(HttpStatus.OK).body("Aktor basariyla silindi");
	}
	else {
	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Aktor silinemedi");
	}
    }*/
}
