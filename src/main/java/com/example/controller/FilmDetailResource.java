package com.example.controller;

import com.example.model.Comment;
import com.example.model.Favourite;
import com.example.model.FilmCommentDTO;
import com.example.movie.*;
import com.example.service.FilmDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:8000")
@RestController
@RequestMapping(value = "filmdetail")
public class FilmDetailResource {
   @Autowired
    public FilmDetailService filmDetailService;

    @GetMapping(path = "getall", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public ResponseEntity<MovieDto> getAll() {
        // localhost:8080/filmdetail/getall
        return new ResponseEntity<>(filmDetailService.getAll(), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://locahost:8000")
    @GetMapping(path = "findbylike", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MovieDto>findByLike(@RequestParam String expression) {
        // localhost:8080/filmdetail/findbylike?expression=Ti
        return new ResponseEntity<>(filmDetailService.findByLike(expression), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://locahost:8000")
    @GetMapping(path = "getactorfilms", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ActorMovieDto> getActorFilms(@RequestParam String name) {
        // localhost:8080/filmdetail/getactorfilms?name=al
        return new ResponseEntity<>(filmDetailService.getActorFilms(name), HttpStatus.OK);
    }

    @GetMapping(path = "getallfavs", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public ResponseEntity<FavouritesDTO> getAllFavs() {
        // localhost:8080/filmdetail/getallfavs
        return new ResponseEntity<>(filmDetailService.getAllFavs(), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://locahost:8000")
    @PostMapping(path = "saveFavs", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> saveFavs(@RequestBody Favourite favourite) {
        boolean isSaved = filmDetailService.postFavourites(favourite);
        // localhost:8080/filmdetail/saveFavs
        if (isSaved) {
            return ResponseEntity.status(HttpStatus.OK).body(favourite.getMovie_id() + " adli film basariyla eklendi");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Film eklenemedi");
        }
    }

    @CrossOrigin(origins = "http://locahost:8000")
    @DeleteMapping(path = "deleteFavs/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteFavs(@PathVariable long id) {
        boolean isDeleted = filmDetailService.deleteFavourites(id);
        // localhost:8080/filmdetail/deleteFavs/1
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("film basariyla silindi");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Film silinemedi");
        }
    }

    @GetMapping(path = "getallcomments/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:8000")
    public ResponseEntity<List<Comment>> getAllComments(@PathVariable long id) {
        // localhost:8080/filmdetail/getallcomments/1
        return new ResponseEntity<>(filmDetailService.getComments(id), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://locahost:8000")
    @PostMapping(path = "postComments", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postComments(@RequestBody FilmCommentDTO dto) {
        boolean isSaved = filmDetailService.postComments(dto);
        // localhost:8080/filmdetail/postComments
        if (isSaved) {
            return ResponseEntity.status(HttpStatus.OK).body("Yorum basariyla eklendi");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Yorum eklenemedi");
        }
    }

}
