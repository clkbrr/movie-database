package com.example.repository;

import com.example.constants.FilmDetailSql;
import com.example.constants.UserSql;
import com.example.controller.UserResource;
import com.example.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FilmDetailRepo {
    @Autowired
    public JdbcTemplate jdbcTemplate;
    @Autowired
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    List<FilmDetail> filmDetailList = new ArrayList<>();

    public List<FilmDetail> getAll() {

        RowMapper<FilmDetail> rowMapper = new RowMapper<FilmDetail>() {

            @Override
            public FilmDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
                Film film = new Film();
                film.setId(rs.getLong("film_id"));
                film.setTitle(rs.getString("title"));
                film.setDescription(rs.getString("description"));
                film.setRelease_year(rs.getInt("release_year"));
                film.setCountry_id(rs.getLong("country_id"));
                film.setImdb(rs.getDouble("imdb"));


                Country country = new Country();

                country.setCountry(rs.getString("country"));

                Poster poster = new Poster();
                poster.setPath(rs.getString("poster_path"));
                poster.setFilm_id(rs.getLong("movie_id"));

                Actor actor = new Actor();


                String[] actors = (String[])rs.getArray("actors").getArray();
                ArrayList<String> actorList = new ArrayList<>();

                for (int i = 0; i < actors.length; i++) {
                    actorList.add(actors[i]);
                }

                actor.setActors(actorList);

                Category category = new Category();

                String[] categories = (String[])rs.getArray("category").getArray();
                ArrayList<String> categoryList = new ArrayList<>();

                for (int i = 0; i < categories.length; i++) {
                    categoryList.add(categories[i]);
                }

                category.setCategories(categoryList);

                Director director = new Director();
                director.setDirector(rs.getString("director"));
                return new FilmDetail(film, poster, actor, category, actorList, categoryList, director, country);
            }
        };

        filmDetailList = jdbcTemplate.query(FilmDetailSql.getGetAll(), rowMapper);
        return filmDetailList;


        /*RowMapper<FilmDetail> rowMapper = new RowMapper<FilmDetail>() {

            @Override
            public FilmDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
                Film film = new Film();
                film.setId(rs.getLong("film_id"));
                film.setTitle(rs.getString("title"));
                film.setDescription(rs.getString("description"));
                film.setRelease_year(rs.getInt("release_year"));
                film.setCountry_id(rs.getLong("country_id"));

                Country country = new Country();

                country.setCountry(rs.getString("country"));

                Poster poster = new Poster();
                poster.setPath(rs.getString("poster_path"));
                poster.setFilm_id(rs.getLong("movie_id"));

                Actor actor = new Actor();

                String[] actors = (String[])rs.getArray("actors").getArray();
                ArrayList<String> actorList = new ArrayList<>();

                for (int i = 0; i < actors.length; i++) {
                    actorList.add(actors[i]);
                }

                actor.setActors(actorList);

                Category category = new Category();

                String[] categories = (String[])rs.getArray("category").getArray();
                ArrayList<String> categoryList = new ArrayList<>();

                for (int i = 0; i < categories.length; i++) {
                    categoryList.add(categories[i]);
                }

                category.setCategories(categoryList);

                Director director = new Director();
                director.setDirector(rs.getString("director"));
                return new FilmDetail(film, poster, actor, category, country, director);
            }
        };

        films = jdbcTemplate.query(FilmDetailSql.getGetAll(), rowMapper);
        return films;*/
    }

   public List<FilmDetail> findByLike(String title) {
        Map<String, Object> paramMap = new HashMap();
        paramMap.put("TITLE", "%" + title + "%");

        List<FilmDetail> filmDetails;

        List<FilmDetail> resultList = namedParameterJdbcTemplate.query(FilmDetailSql.getFindByLike(), paramMap,
                (rs, arg1) -> {
                    Film film = new Film();
                    film.setId(rs.getLong("film_id"));
                    film.setTitle(rs.getString("title"));
                    film.setDescription(rs.getString("description"));
                    film.setRelease_year(rs.getInt("release_year"));
                    film.setCountry_id(rs.getLong("country_id"));
                    film.setImdb(rs.getDouble("imdb"));

                    Country country = new Country();
                    country.setCountry("country");

                    Poster poster = new Poster();
                    poster.setPath(rs.getString("poster_path"));
                    poster.setFilm_id(rs.getLong("movie_id"));

                    Actor actor = new Actor();

                    String[] actors = (String[])rs.getArray("actors").getArray();
                    ArrayList<String> actorList = new ArrayList<>();

                    for (int i = 0; i < actors.length; i++) {
                        actorList.add(actors[i]);
                    }

                    actor.setActors(actorList);

                    Category category = new Category();

                    String[] categories = (String[])rs.getArray("category").getArray();
                    ArrayList<String> categoryList = new ArrayList<>();

                    for (int i = 0; i < categories.length; i++) {
                        categoryList.add(categories[i]);
                    }

                    category.setCategories(categoryList);

                    Director director = new Director();
                    director.setDirector(rs.getString("director"));

                    return new FilmDetail(film, poster, actorList, categoryList, director, country);
                });

        filmDetails = resultList;

        return filmDetails;
    }

    public List<Film> getFilmsLike(String name) {
        List<Film> filmList;

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("NAME", "%" + name + "%");

        List<Film> resultList = namedParameterJdbcTemplate.query(FilmDetailSql.getGetActorFilmsLike(), paramMap,
                (rs, arg1) -> {
                    Film film = new Film();
                    film.setId(rs.getLong("film_id"));
                    film.setTitle(rs.getString("title"));
                    film.setDescription(rs.getString("description"));
                    film.setRelease_year(rs.getInt("release_year"));
                    film.setImdb(rs.getDouble("imdb"));
                    film.setPoster(rs.getString("poster_path"));
                    film.setCountry_id(rs.getLong("country_id"));
                    film.setCountry(rs.getString("country"));
                    film.setImdb(rs.getDouble("imdb"));

                    film.setActor(rs.getString("actor"));

                    String[] categories = (String[])rs.getArray("category").getArray();
                    ArrayList<String> categoryList = new ArrayList<>();

                    for (int i = 0; i < categories.length; i++) {
                        categoryList.add(categories[i]);
                    }

                    film.setCategories(categoryList);


                    film.setDirector(rs.getString("director"));

                    return new Film(film.getId(), film.getTitle(), film.getDescription(), film.getRelease_year(),
                            film.getPoster(), film.getActor(),  categoryList, film.getDirector(), film.getCountry(), film.getImdb());
                });

        filmList = resultList;
        return filmList;
    }

    public List<Favourite> getAllFavs(){
        List<Favourite> favouriteList;

        RowMapper<Favourite> rowMapper = new RowMapper<Favourite>() {
            @Override
            public Favourite mapRow(ResultSet rs, int rowNum) throws SQLException {

                return new Favourite(rs.getLong("movie_id"), rs.getString("movieTitle"), rs.getString("actors"), rs.getString("director"), rs.getString("year"));
            }
        };

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("ID", UserResource.currentUserId);

        favouriteList = namedParameterJdbcTemplate.query(FilmDetailSql.getGetAllFavs(), paramMap, rowMapper);
        return favouriteList;
    }

    public boolean saveFavs(Favourite favourite) {
        boolean isSaved = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("FILM", favourite.getFilm_id());
        paramMap.put("ID", UserResource.currentUserId);

        isSaved = namedParameterJdbcTemplate.update(FilmDetailSql.getPostFavourites(), paramMap) == 1;

        return isSaved;
    }

    public boolean deleteFavs(long id) {
        boolean isDeleted = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("ID", id);
        paramMap.put("USR_ID", UserResource.currentUserId);

        isDeleted = namedParameterJdbcTemplate.update(FilmDetailSql.getDeleteFav(), paramMap) == 1;

        return isDeleted;
    }

    public List<Comment> getAllComments(long id) {
        List<Comment> commentList;

        RowMapper<Comment> commentRowMapper = new RowMapper<Comment>() {
            @Override
            public Comment mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Comment(rs.getLong("id"), rs.getString("comment"), rs.getString("username"), rs.getString("avatar"));
            }
        };

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("ID", id);

        commentList = namedParameterJdbcTemplate.query(FilmDetailSql.getGetComments(), paramMap, commentRowMapper);
        return commentList;
    }

    public boolean postComments(FilmCommentDTO dto) {
        boolean isSaved = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("ID", dto.getFilm_id());
        paramMap.put("COMMENT", dto.getComment_text());
        paramMap.put("USR_ID", UserResource.currentUserId);

        isSaved = namedParameterJdbcTemplate.update(FilmDetailSql.getPostComments(), paramMap) == 1;

        return isSaved;
    }
/*    public List<FilmDetail> findByTitle(String title) {
        *//*String sql = "select * from filmdb.film, filmdb.director, filmdb.actor,\n" +
                "filmdb.film_actor\n" +
                "WHERE film_actor.film_id = film.film_id AND film_actor.actor_id = actor.actor_id\n" +
                "AND director.director_id = film.director_id\n" +
                "AND title = :TITLE ";
*//*
        String sql ="SELECT\n" +
                "film.film_id, film.title, film.description, film.release_year,\n" +
                "poster.poster_path, poster.movie_id,\n" +
                "  concat(director.director_name, ' ', director.director_surname) as director,\n" +
                "  array_agg(concat(actor.actor_name,' ', actor.actor_surname)) AS actors\n" +
                "FROM filmdb.film, filmdb.poster, filmdb.actor, filmdb.film_actor, filmdb.director\n" +
                "where  film.film_id = film_actor.film_id and \n" +
                "actor.actor_id = film_actor.actor_id and film.director_id = director.director_id\n" +
                "and UPPER(film.title) = :UPPER(TITLE) and film.film_id = poster.movie_id\n" +
                "GROUP BY\n" +
                "  film.film_id, film.title, film.description, film.release_year, poster.poster_path, poster.movie_id, director.director_name, director.director_surname\n" +
                "ORDER BY\n" +
                "  film.film_id, film.title, film.description, film.release_year, poster.poster_path, poster.movie_id, director.director_name, director.director_surname";

        Map<String, Object> paramMap = new HashMap();
        paramMap.put("TITLE", title);


        List<FilmDetail> filmDetails;

        List<FilmDetail> resultList = namedParameterJdbcTemplate.query(sql, paramMap,
                (rs, arg1) -> {
                    Film film = new Film();
                    film.setId(rs.getLong("film_id"));
                    film.setTitle(rs.getString("title"));
                    film.setDescription(rs.getString("description"));
                    film.setRelease_year(rs.getInt("release_year"));

                    Poster poster = new Poster();
                    poster.setPath(rs.getString("poster_path"));
                    poster.setFilm_id(rs.getLong("movie_id"));

                    Actor actor = new Actor();
                    //actor.setId(rs.getLong("actor_id"));
                    //actor.setActor_name(rs.getString("actor_name"));
                    //actor.setActor_surname(rs.getString("actor_surname"));
                    //String newActor = actor.getActor_name() + " " + actor.getActor_surname();

                    String[] actors = (String[])rs.getArray("actors").getArray();
                    ArrayList<String> actorList = new ArrayList<>();

                    for (int i = 0; i < actors.length; i++) {
                        actorList.add(actors[i]);
                    }

                    actor.setActors(actorList);

                    Director director = new Director();
                    //director.setId(rs.getLong("director_id"));
                    //director.setDirector_name(rs.getString("director_name"));
                    //director.setDirector_surname(rs.getString("director_surname"));
                    director.setDirector(rs.getString("director"));

                    *//*FilmActor filmActor = new FilmActor();
                    filmActor.setFilm_id(rs.getLong("film_id"));
                    filmActor.setActor_id(rs.getLong("actor_id"));*//*

                    return new FilmDetail(film, poster, actor, actorList, director);
                });

        filmDetails = resultList;

        return filmDetails;
    }*/
}
