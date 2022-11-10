package com.example.constants;

public class UserSql {

    private static final String save = "INSERT INTO filmdb.\"User\"(\n" +
            "\tusername, password, email, avatar)\n" +
            "\tVALUES (:USERNAME, :PASSWORD, :MAIL, :AVATAR)";
    private static final String findByLoginAndPassword = "SELECT username, \"password\" FROM filmdb.\"User\" WHERE username = :USERNAME\n" +
            "AND password = :PASSWORD";

    private static final String findByUsername = "SELECT * FROM filmdb.\"User\" WHERE username = :USERNAME";

    private static final String postAvatar = "UPDATE filmdb.\"User\"\n" +
            "\tSET avatar= :AVATAR\n" +
            "\tWHERE username = :USERNAME";

    private static final String getUserDetails = "select \"User\".id, \"User\".username, \"User\".avatar,\n" +
    "film.film_id, film.title, film.release_year,\n" +
    "array_agg(distinct concat(actor.actor_name,' ', actor.actor_surname)) AS actors,\n" +
    "concat(director.director_name, ' ', director.director_surname) as director\n" +
    "from filmdb.\"User\", filmdb.film, filmdb.user_favourites, filmdb.actor, filmdb.director,\n" +
    "filmdb.film_actor\n" +
    "where username = :USERNAME\n" +
    "and \"User\".id = user_favourites.user_id\n" +
    "and film.film_id = user_favourites.movie_id\n" +
    "and actor.actor_id = film_actor.actor_id\n" +
    "and film.film_id = film_actor.film_id\n" +
    "and film.director_id = director.director_id\n" +
    "group by \"User\".id, film.film_id, director.director_name, director.director_surname";

    private static final String getUserComments = "select \"comment\".\"comment\", film.title\n" +
            "from filmdb.\"comment\", filmdb.\"User\", filmdb.film, filmdb.film_comment\n" +
            "where \"User\".username = :USERNAME \n" +
            "and \"comment\".id = film_comment.comment_id\n" +
            "and \"User\".id = film_comment.user_id\n" +
            "and film.film_id = film_comment.film_id\n" +
            "order by \"comment\".id desc";

    public static String getFindByLoginAndPassword() {
        return findByLoginAndPassword;
    }

    public static String getFindByUsername() {
        return findByUsername;
    }

    public static String getPostAvatar() {
        return postAvatar;
    }

    public static String getSave() {
        return save;
    }

    public static String getGetUserDetails() {
        return getUserDetails;
    }

    public static String getGetUserComments() {
        return getUserComments;
    }
}
