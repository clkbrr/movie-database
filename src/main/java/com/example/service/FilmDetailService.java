package com.example.service;

import com.example.model.Comment;
import com.example.model.Favourite;
import com.example.model.FilmCommentDTO;
import com.example.model.FilmDetail;
import com.example.movie.*;
import com.example.repository.FilmDetailRepo;
import com.example.repository.UserRepo;
import net.devh.boot.grpc.client.inject.GrpcClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FilmDetailService {

    @Autowired
    public FilmDetailRepo filmDetailRepo;

    @GrpcClient("movies")
    private MovieServiceGrpc.MovieServiceBlockingStub movieServiceBlockingStub;

    public MovieDto getAll() {
        MovieRequest movieRequest = MovieRequest.newBuilder().build();
        MovieDtoResponse movieDtoResponse = this.movieServiceBlockingStub.getMovies(movieRequest);

       return movieDtoResponse.getMovie();
    }

    public MovieDto findByLike(String title) {
        MovieDtoResponse movieDtoResponse = movieServiceBlockingStub.getMoviesLike(MovieLikeRequest.newBuilder()
                .setTitle(title).build());
        return movieDtoResponse.getMovie();
    }

    public ActorMovieDto getActorFilms(String name) {
        ActorMovieResponse actorMovieResponse = this.movieServiceBlockingStub.getActorMovies(ActorMoviesRequest.newBuilder()
                .setName(name).build());
        return actorMovieResponse.getMovie();
    }

    public boolean postFavourites(Favourite favourite) {
        PostFavsResponse postFavsResponse = movieServiceBlockingStub.postFavourites(PostFavsRequest.newBuilder()
                .setFilmId(favourite.getFilm_id()).build());
        return  postFavsResponse.getIsSaved();
    }
    public FavouritesDTO getAllFavs() {
        FavouritesRequest request = FavouritesRequest.newBuilder().build();
        FavouritesResponse favouritesResponse = this.movieServiceBlockingStub.getFavourites(request);

        return favouritesResponse.getFilm();
    }

    public boolean deleteFavourites(long id) {
        DeleteFavsResponse deleteFavsResponse = movieServiceBlockingStub.deleteFavourites(DeleteFavsRequest.newBuilder()
                .setFilmId(id).build());
        return  deleteFavsResponse.getIsDeleted();
    }

    public List<Comment> getComments(long id) {
        return filmDetailRepo.getAllComments(id);
    }

    public CommentsDTO getAllComments(long id) {
        CommentRequest request = CommentRequest.newBuilder().setFilmId(id).build();
        CommentResponse commentResponse = this.movieServiceBlockingStub.getComments(request);

        return commentResponse.getComments();
    }

    public boolean postComments(FilmCommentDTO dto) {

        CommentPostResponse commentPostResponse = movieServiceBlockingStub.postComments(CommentPostRequest.newBuilder()
                .setFilmId(dto.getFilm_id())
                .setComment(dto.getComment_text()).build());

        return  commentPostResponse.getIsSaved();
    }

}
