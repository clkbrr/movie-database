package com.example.constants;

public class ActorSql {
    private static final String GET_FILMS_LIKE = "SELECT film.film_id, film.title, film.description, film.release_year,\n" +
            "poster.poster_path, poster.movie_id,\n" +
            "concat(director.director_name, ' ', director.director_surname) as director,\n" +
            "concat(actor.actor_name,' ', actor.actor_surname) AS actor,\n" +
            "country.country_id, country.country,\n" +
            "array_agg(distinct category.name) AS category\n" +
            "FROM filmdb.film, filmdb.poster, filmdb.actor, filmdb.film_actor, filmdb.director, filmdb.country, filmdb.category, filmdb.film_category\n" +
            "where  film.film_id = film_actor.film_id and \n" +
            "actor.actor_id = film_actor.actor_id and film.director_id = director.director_id\n" +
            "and film.film_id = poster.movie_id\n" +
            "and film.film_id = film_category.film_id and category.category_id = film_category.category_id\n" +
            "and film.country_id = country.country_id\n" +
            "and CONCAT(actor.actor_name,' ',actor.actor_surname) ilike :NAME\n" +
            "GROUP By\n" +
            "  film.film_id, film.title, film.description, film.release_year, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname, country.country_id, country.country\n" +
            "  ,actor.actor_name, actor.actor_surname\n" +
            "ORDER BY\n" +
            "  film.film_id, film.title, film.description, film.release_year, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname, country.country_id, country.country";

    public static String getFilmsLike() {
        return GET_FILMS_LIKE;
    }

}