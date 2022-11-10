package com.example.constants;

public class FilmDetailSql {
    private static final String GET_ALL = "SELECT\n" +
            "film.film_id, film.title, film.description, film.release_year, film.imdb,\n" +
            "poster.poster_path, poster.movie_id,\n" +
            "concat(director.director_name, ' ', director.director_surname) as director,\n" +
            "array_agg(distinct category.name) AS category,\n" +
            "country.country_id, country.country,\n" +
            "array_agg(distinct concat(actor.actor_name,' ', actor.actor_surname)) AS actors\n" +
            "FROM filmdb.film, filmdb.poster, filmdb.director, \n" +
            "filmdb.category, filmdb.film_category,\n" +
            "filmdb.country, filmdb.actor, filmdb.film_actor\n" +
            "where  film.film_id = film_actor.film_id and\n" +
            "actor.actor_id = film_actor.actor_id and \n" +
            "film.film_id = film_category.film_id and category.category_id = film_category.category_id\n" +
            "and film.director_id = director.director_id\n" +
            "and film.film_id = poster.movie_id\n" +
            "and film.country_id = country.country_id\n" +
            "GROUP BY\n" +
            "film.film_id, film.title, film.description, film.release_year, film.imdb, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname,country.country_id, country.country\n" +
            "ORDER BY\n" +
            "film.film_id, film.title, film.description, film.release_year, film.imdb, poster.poster_path, poster.movie_id, director.director_name, director.director_surname, country.country_id, country.country";;

    private static final String FIND_BY_LIKE = "SELECT\n" +
            "film.film_id, film.title, film.description, film.release_year, film.imdb,\n" +
            "poster.poster_path, poster.movie_id,\n" +
            "concat(director.director_name, ' ', director.director_surname) as director,\n" +
            "array_agg(distinct category.name) AS category,\n" +
            "country.country_id, country.country,\n" +
            "array_agg(distinct concat(actor.actor_name,' ', actor.actor_surname)) AS actors\n" +
            "FROM filmdb.film, filmdb.poster, filmdb.director, \n" +
            "filmdb.category, filmdb.film_category,\n" +
            "filmdb.country, filmdb.actor, filmdb.film_actor\n" +
            "where  film.film_id = film_actor.film_id and\n" +
            "actor.actor_id = film_actor.actor_id and \n" +
            "film.film_id = film_category.film_id and category.category_id = film_category.category_id\n" +
            "and film.director_id = director.director_id\n" +
            "and film.film_id = poster.movie_id\n" +
            "and film.country_id = country.country_id\n" +
            "and film.title ilike :TITLE\n" +
            "GROUP BY\n" +
            "film.film_id, film.title, film.description, film.release_year, film.imdb, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname,country.country_id, country.country\n" +
            "ORDER BY\n" +
            "film.film_id, film.title, film.description, film.release_year, film.imdb, poster.poster_path, poster.movie_id, director.director_name, director.director_surname, country.country_id, country.country";

    private static final String GET_ACTOR_FILMS_LIKE = "SELECT film.film_id, film.title, film.description, film.release_year, film.imdb,\n" +
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
            "  film.film_id, film.title, film.description, film.release_year, film.imdb, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname, country.country_id, country.country\n" +
            "  ,actor.actor_name, actor.actor_surname\n" +
            "ORDER BY\n" +
            "  film.film_id, film.title, film.description, film.release_year, film.imdb, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname, country.country_id, country.country";

    private static final String POST_FAVOURITES = "with film as (\n" +
            "   SELECT film.film_id\n" +
            "              FROM filmdb.film\n" +
            "             WHERE film.film_id = :FILM\n" +
            "            ),\n" +
            "   usr as (\n" +
            "             SELECT \"User\".id\n" +
            "              FROM filmdb.\"User\"\n" +
            "             WHERE \"User\".id = :ID\n" +
            "            )\n" +
            "           INSERT INTO filmdb.user_favourites(user_id, movie_id)\n" +
            "            SELECT *\n" +
            "            FROM usr, film\n" +
            "            WHERE not exists (select user_id, movie_id\n" +
            "                              from filmdb.user_favourites\n" +
            "                              where movie_id in (select film_id\n" +
            "                                                  from film)\n" +
            "and\n" +
            "user_id in (select id from usr))";
    private static final String GET_ALL_FAVS = "select film.film_id, film.title as movieTitle, film.release_year as year,\n" +
            "concat(director.director_name, ' ', director.director_surname) as director,\n" +
            "string_agg(concat(actor.actor_name,' ', actor.actor_surname), ',') AS actors,\n" +
            "user_favourites.user_id, user_favourites.movie_id, \"User\".id \n" +
            "from filmdb.film, filmdb.director, filmdb.actor, filmdb.user_favourites, filmdb.film_actor, filmdb.\"User\"\n" +
            "where\n" +
            "user_favourites.movie_id = film.film_id and film_actor.actor_id = actor.actor_id and film.film_id = film_actor.film_id\n" +
            "and film.director_id = director.director_id\n" +
            "and user_favourites.user_id = \"User\".id\n"+
            "and \"User\".id = :ID\n" +
            "GROUP BY\n" +
            "film.film_id, film.title, film.release_year, \"User\".id, user_favourites.user_id, user_favourites.movie_id, director.director_name, director.director_surname\n" +
            "ORDER By\n" +
            "film.film_id, film.title, film.release_year, \"User\".id, user_favourites.user_id, user_favourites.movie_id, director.director_name, director.director_surname";

    private static final String DELETE_FAV = "DELETE FROM filmdb.user_favourites\n" +
            "WHERE EXISTS\n" +
            "  ( SELECT 1\n" +
            "    FROM filmdb.film, filmdb.\"User\"\n" +
            "    WHERE film.film_id = user_favourites.movie_id\n" +
            "and \"User\".id = user_favourites.user_id\n"+
            "  and film_id = :ID and user_id = :USR_ID)";

    private static final String GET_COMMENTS = "select \"comment\".id, \"comment\".\"comment\", film.film_id,\n" +
            "            \"User\".id, \"User\".username, \"User\".avatar \n" +
            "            from filmdb.comment, filmdb.film, filmdb.\"User\", filmdb.film_comment\n" +
            "            where \"comment\".id = film_comment.comment_id\n" +
            "            and film.film_id = film_comment.film_id\n" +
            "            and \"User\".id = film_comment.user_id\n" +
            "            and film.film_id = :ID order by \"comment\".id DESC";

    private static final String POST_COMMENTS = "WITH x AS (\n" +
            "   INSERT INTO filmdb.comment (comment) VALUES (:COMMENT)\n" +
            "   RETURNING id\n" +
            ")\n" +
            "INSERT INTO filmdb.film_comment (film_id, comment_id, user_id)\n" +
            "SELECT :ID, id, :USR_ID FROM x";

    public static String getGetActorFilmsLike() {
        return GET_ACTOR_FILMS_LIKE;
    }

    public static String getGetAll() {
        return GET_ALL;
    }

    public static String getFindByLike() {
        return FIND_BY_LIKE;
    }

    public static String getGetAllFavs() {
        return GET_ALL_FAVS;
    }

    public static String getPostFavourites() {
        return POST_FAVOURITES;
    }

    public static String getDeleteFav() {
        return DELETE_FAV;
    }

    public static String getGetComments() {
        return GET_COMMENTS;
    }

    public static String getPostComments() {
        return POST_COMMENTS;
    }
}
