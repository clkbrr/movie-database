package com.example.repository;

import com.example.constants.FavouriteSql;
import com.example.model.Favourite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FavouriteRepo {
    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Autowired
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<Favourite> getAll(){
        List<Favourite> favouriteList;

        RowMapper<Favourite> rowMapper = new RowMapper<Favourite>() {
            @Override
            public Favourite mapRow(ResultSet rs, int rowNum) throws SQLException {

                return new Favourite(rs.getLong("movie"), rs.getString("movieTitle"), rs.getString("actors"), rs.getString("director"), rs.getString("year"));
            }
        };

        favouriteList = jdbcTemplate.query(FavouriteSql.getGetAll(), rowMapper);

        return favouriteList;
    }

    public boolean save(Favourite favourite) {
        boolean isSaved = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("FILM", favourite.getFilm_id());

        isSaved = namedParameterJdbcTemplate.update(FavouriteSql.getSave(), paramMap) == 1;

        return isSaved;
    }

    public boolean delete(long id) {
        boolean isDeleted = false;

        Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put("ID", id);

        isDeleted = namedParameterJdbcTemplate.update(FavouriteSql.getDelete(), paramMap) == 1;

        return isDeleted;
    }
}
