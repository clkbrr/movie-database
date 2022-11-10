package com.example.controller;

import com.example.model.Favourite;
import com.example.repository.FavouriteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping(value = "favourites")
public class FavouriteResource {
    @Autowired
    public FavouriteRepo favouriteRepo;

    @CrossOrigin(origins = "http://locahost:8000")
    @GetMapping(path = "getall", produces = MediaType.APPLICATION_JSON_VALUE)
    public ArrayList<Favourite> getAll(){
        // localhost:8080/favourites/getall
        ArrayList<Favourite> favouriteList = (ArrayList<Favourite>) favouriteRepo.getAll();
        return favouriteList;
    }

    /*@CrossOrigin(origins = "http://locahost:8000")
    @PostMapping(path = "save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> save(@RequestBody Favourite favourite) {
        boolean isSaved = favouriteRepo.save(favourite);
        // localhost:8080/favourites/save
        if (isSaved) {
            return ResponseEntity.status(HttpStatus.OK).body(favourite.getMovie() + " adli film basariyla eklendi");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Film eklenemedi");
        }
    }*/

    /*@CrossOrigin(origins = "http://locahost:8000")
    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<String> delete(@PathVariable long id) {
        boolean isDeleted = favouriteRepo.delete(id);
        // localhost:8080/favourite/delete/2
        if (isDeleted) {
            return ResponseEntity.status(HttpStatus.OK).body("Film basariyla silindi");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Film silinemedi");
        }
    }*/
}
