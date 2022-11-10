package com.example.repository;

import com.example.Ddto.UserCommentDto;
import com.example.constants.UserSql;
import com.example.model.Film;
import com.example.model.UserDetails;
import com.example.model.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Array;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class UserRepo {

    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Autowired
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public UserModel findByUsernameAndPassword(String username, String password) {
        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("USERNAME", username);
        paramMap.put("PASSWORD", password);

        RowMapper<UserModel> userModelRowMapper = new RowMapper<UserModel>() {
            @Override
            public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new UserModel(rs.getString("username"), rs.getString("password"));
            }
        };

        return  namedParameterJdbcTemplate.queryForObject(UserSql.getFindByLoginAndPassword(), paramMap ,userModelRowMapper);
    }

    public UserModel findByUsername(String username) {
        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("USERNAME", username);

        RowMapper<UserModel> userModelRowMapper = new RowMapper<UserModel>() {
            @Override
            public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new UserModel(rs.getLong("id"), rs.getString("username"), rs.getString("password"), rs.getString("email"), rs.getString("avatar"));
            }
        };

        try {
            return namedParameterJdbcTemplate.queryForObject(UserSql.getFindByUsername(), paramMap ,userModelRowMapper);
        } catch (EmptyResultDataAccessException e) {
            System.err.println("Username not found");
            return null;
        }
    }

    public List<UserDetails> getUserDetails(String username) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("USERNAME", username);

        List<UserDetails> resultList = namedParameterJdbcTemplate.query(UserSql.getGetUserDetails(), paramMap,
        (rs, arg1) -> {
            UserDetails userDetails = new UserDetails();

            Film film = new Film();
            film.setId(rs.getLong("film_id"));
            film.setTitle(rs.getString("title"));
            film.setRelease_year(rs.getInt("release_year"));
            userDetails.setFilm(film);

            List<String> actorss = Arrays.stream((String[]) ((rs.getArray("actors").getArray()))).toList();
            userDetails.setActors(actorss);

            UserModel user = new UserModel();
            user.setId(rs.getLong("id"));
            user.setUsername(rs.getString("username"));
            user.setAvatar(rs.getString("avatar"));
            userDetails.setUser(user);

            userDetails.setDirector(rs.getString("director"));

            return new UserDetails(user, film, userDetails.getActors(), userDetails.getDirector());
        });

        return resultList;
    }

    public boolean postAvatar(String username, String avatar) {
        boolean isSaved = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("USERNAME", username);
        paramMap.put("AVATAR", avatar);

        isSaved = namedParameterJdbcTemplate.update(UserSql.getPostAvatar(), paramMap) == 1;

        return isSaved;
    }

    public boolean save(UserModel user) {
        boolean isSaved = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("USERNAME", user.getUsername());
        paramMap.put("PASSWORD", user.getPassword());
        paramMap.put("MAIL", user.getEmail());
        paramMap.put("AVATAR", user.getAvatar());

        isSaved = namedParameterJdbcTemplate.update(UserSql.getSave(), paramMap) == 1;

        return isSaved;
    }

    public List<UserCommentDto> getUserComments(String username) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("USERNAME", username);

        List<UserCommentDto> resultList = namedParameterJdbcTemplate.query(UserSql.getGetUserComments(), paramMap,
                (rs, arg1) -> {
                    UserCommentDto userCommentDto = new UserCommentDto();

                    userCommentDto.setComment(rs.getString("comment"));

                    userCommentDto.setFilm_title(rs.getString("title"));

                    return new UserCommentDto(userCommentDto.getComment(), userCommentDto.getFilm_title());
                });

        return resultList;
    }
}
