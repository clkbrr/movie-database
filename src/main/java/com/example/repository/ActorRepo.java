package com.example.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ActorRepo {

    @Autowired
    public JdbcTemplate jdbcTemplate;

    @Autowired
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	/*public List<Film> getFilmsLike(String name) {
		List<Film> filmList;

		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("NAME", "%" + name + "%");

		List<Film> resultList = namedParameterJdbcTemplate.query(ActorSql.getFilmsLike(), paramMap,
				(rs, arg1) -> {
					Film film = new Film();
					film.setId(rs.getLong("film_id"));
					film.setTitle(rs.getString("title"));
					film.setDescription(rs.getString("description"));
					film.setRelease_year(rs.getInt("release_year"));
					film.setPoster(rs.getString("poster_path"));
					film.setCountry_id(rs.getLong("country_id"));


					film.setActor(rs.getString("actor"));

					Country country = new Country();

					country.setCountry(rs.getString("country"));

					String[] categories = (String[])rs.getArray("category").getArray();
					ArrayList<String> categoryList = new ArrayList<>();

					for (int i = 0; i < categories.length; i++) {
						categoryList.add(categories[i]);
					}

					film.setCategory(categoryList);


					film.setDirector(rs.getString("director"));

					return new Film(film.getId(), film.getTitle(), film.getDescription(), film.getRelease_year(),
							film.getDirector(), film.getCountry_id(),  film.getActor(), film.getPoster(), film.getCategory(), country);
				});

		filmList = resultList;
		return filmList;
	}*/

    /*public List<Actor> getAll() {
	List<Actor> actorList;
	String sql = "SELECT * FROM \"filmdb\".\"actor\"";

	RowMapper<Actor> rowMapper = new RowMapper<Actor>() {

	    @Override
	    public Actor mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Actor(rs.getLong("actor_id"), rs.getString("actor_name"), rs.getString("actor_surname"), new ArrayList((Arrays.asList(rs.getArray("actors")))));
	    }
	};

	actorList = jdbcTemplate.query(sql, rowMapper);
	return actorList;
    }

    public Actor getById(long id) {
	Actor actor = null;
	String sql = "SELECT * FROM \"filmdb\".\"actor\" WHERE actor_id = :ID";

	RowMapper<Actor> rowMapper = new RowMapper<Actor>() {

	    @Override
	    public Actor mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Actor(rs.getLong("actor_id"), rs.getString("actor_name"), rs.getString("actor_surname"), new ArrayList((Arrays.asList(rs.getArray("actors")))));
	    }
	};

	Map<String, Object> paramMap = new HashMap();

	paramMap.put("ID", id);

	actor = namedParameterJdbcTemplate.queryForObject(sql, paramMap, rowMapper);
	return actor;
    }

    public List<Actor> findByName(String name) {
	String sql = "SELECT * FROM \"filmdb\".\"actor\" WHERE actor_name = :NAME";
	List<Actor> actorList;

	RowMapper<Actor> rowMapper = new RowMapper<Actor>() {

	    @Override
	    public Actor mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Actor(rs.getLong("actor_id"), rs.getString("actor_name"), rs.getString("actor_surname"), new ArrayList((Arrays.asList(rs.getArray("actors")))));
	    }
	};

	Map<String, Object> paramMap = new HashMap();
	paramMap.put("NAME", name);

	actorList = namedParameterJdbcTemplate.query(sql, paramMap, rowMapper);
	return actorList;
    }*/

    /*public List<Actor> findByNameLike(String expression) {
	List<Actor> actorList;
	String sql = "SELECT * FROM \"filmdb\".\"actor\" WHERE actor_name LIKE :EXP";

	RowMapper<Actor> rowMapper = new RowMapper<Actor>() {

	    @Override
	    public Actor mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Actor(rs.getLong("actor_id"), rs.getString("actor_name"), rs.getString("actor_surname"), new ArrayList((Arrays.asList(rs.getArray("actors")))));
	    }
	};

	Map<String, Object> paramMap = new HashMap();
	paramMap.put("EXP", "%" + expression + "%");

	actorList = namedParameterJdbcTemplate.query(sql, paramMap, rowMapper);
	return actorList;
    }

    public List<Film> getFilms(String name) {
	List<Film> filmList;

	*//*String sql = "SELECT \"film\".\"title\" "
		+ "FROM \"filmdb\".\"film\", \"filmdb\".\"actor\" JOIN \"filmdb\".\"film_actor\" ON \"actor\".\"actor_id\" = \"film_actor\".\"actor_id\" WHERE \"actor\". \"actor_name\" = :NAME AND \"actor\".\"actor_surname\" = :SURNAME";*//*

		String sql = "SELECT film.film_id, film.title, film.description, film.release_year,\n" +
				"poster.poster_path, poster.movie_id,\n" +
				"  concat(director.director_name, ' ', director.director_surname) as director,\n" +
				"  concat(actor.actor_name,' ', actor.actor_surname) AS actor\n" +
				"FROM filmdb.film, filmdb.poster, filmdb.actor, filmdb.film_actor, filmdb.director\n" +
				"where  film.film_id = film_actor.film_id and \n" +
				"actor.actor_id = film_actor.actor_id and film.director_id = director.director_id\n" +
				"and film.film_id = poster.movie_id\n" +
				"and CONCAT(actor.actor_name,' ',actor.actor_surname) = :NAME\n" +
				"GROUP By\n" +
				"  film.film_id, film.title, film.description, film.release_year, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname\n" +
				"  ,actor.actor_name, actor.actor_surname\n" +
				"ORDER BY\n" +
				"  film.film_id, film.title, film.description, film.release_year, poster.poster_path, poster.movie_id,  director.director_name, director.director_surname";

		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("NAME", name);

		List<Film> resultList = namedParameterJdbcTemplate.query(sql, paramMap,
				(rs, arg1) -> {
					Film film = new Film();
					film.setId(rs.getLong("film_id"));
					film.setTitle(rs.getString("title"));
					film.setDescription(rs.getString("description"));
					film.setRelease_year(rs.getInt("release_year"));
					film.setPoster(rs.getString("poster_path"));


					film.setActor(rs.getString("actor"));


					//Director director = new Director();
					//director.setId(rs.getLong("director_id"));
					//director.setDirector_name(rs.getString("director_name"));
					//director.setDirector_surname(rs.getString("director_surname"));
					//director.setDirector(rs.getString("director"));
					film.setDirector(rs.getString("director"));

                    *//*FilmActor filmActor = new FilmActor();
                    filmActor.setFilm_id(rs.getLong("film_id"));
                    filmActor.setActor_id(rs.getLong("actor_id"));*//*

					return new Film(film.getId(), film.getTitle(), film.getDescription(), film.getRelease_year(),
					film.getDirector(), film.getActor(), film.getPoster());
				});

	filmList = resultList;
	return filmList;
    }*/

    /*public boolean save(Actor actor) {
	boolean isSAved = false;

	String sql = "INSERT INTO \"filmdb\".\"actor\"(\"actor_name\", \"actor_surname\") VALUES (:NAME, :SURNAME)";

	Map<String, Object> paramMap = new HashMap();

	paramMap.put("NAME", actor.getActor_name());
	paramMap.put("SURNAME", actor.getActor_surname());

	isSAved = namedParameterJdbcTemplate.update(sql, paramMap) == 1;

	return isSAved;
    }

    public boolean delete(long id) {
	boolean isDeleted = false;

	String sql = "DELETE FROM \"filmdb\".\"actor\" WHERE actor_id = :ID";

	Map<String, Object> paramMap = new HashMap();
	paramMap.put("ID", id);
	isDeleted = namedParameterJdbcTemplate.update(sql, paramMap) == 1;
	return isDeleted;
    }*/
}
