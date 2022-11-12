package com.example.constants;

public class FavouriteSql {
    private static final String GET_ALL = "select film.film_id, film.title, film.release_year as year,\n" +
            "concat(director.director_name, ' ', director.director_surname) as director,\n" +
            "string_agg(concat(actor.actor_name,' ', actor.actor_surname), ',') AS actors,\n" +
            "favourite.favourite_id,\n" +
            "favourite.movie from filmdb.film, filmdb.director, filmdb.actor, filmdb.favourite, filmdb.film_actor\n" +
            "where\n" +
            "favourite.movie = film.film_id and film_actor.actor_id = actor.actor_id and film.film_id = film_actor.film_id\n" +
            "and film.director_id = director.director_id\n" +
            "GROUP BY\n" +
            "film.film_id, film.title, film.release_year, favourite.favourite_id,  director.director_name, director.director_surname\n" +
            "ORDER By\n" +
            "film.film_id, film.title, film.release_year, favourite.favourite_id, director.director_name, director.director_surname";

    private static final String SAVE = "with data as (\n" +
            "  SELECT film.film_id\n" +
            "  FROM filmdb.film\n" +
            "  WHERE film.film_id = :FILM\n" +
            ")\n" +
            "INSERT INTO filmdb.favourite(movie)\n" +
            "SELECT *\n" +
            "FROM data\n" +
            "WHERE not exists (select movie \n" +
            "from filmdb.favourite\n" +
            "where movie in (select film_id\n" +
            "from data))";

    private static final String DELETE = "DELETE FROM filmdb.favourite\n" +
            "WHERE EXISTS\n" +
            "(SELECT 1\n" +
            "FROM filmdb.film\n" +
            "WHERE film.film_id = favourite.movie\n" +
            "and film_id = :ID)";

    public static String getGetAll() {
        return GET_ALL;
    }

    public static String getSave() {
        return SAVE;
    }

    public static String getDelete() {
        return DELETE;
    }

}
