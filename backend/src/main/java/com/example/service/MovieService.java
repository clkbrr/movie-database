package com.example.service;

import com.example.model.*;
import com.example.movie.*;
import com.example.movie.Film;
import com.example.repository.FilmDetailRepo;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@GrpcService
public class MovieService extends com.example.movie.MovieServiceGrpc.MovieServiceImplBase {
    @Autowired
    private FilmDetailRepo filmDetailRepo;

    @Override
    public void getMovies(MovieRequest request, StreamObserver<MovieDtoResponse> responseObserver) {
        List<FilmDetail>  filmDetail = filmDetailRepo.getAll();
        com.example.movie.MovieDto filmDetailList;

        List<Film> film_ = filmDetail.stream()
                .map(film -> Film.newBuilder()
                        .setFilmId(film.getFilm().getId())
                        .setTitle(film.getFilm().getTitle())
                        .setDescription(film.getFilm().getDescription())
                        .setReleaseYear(film.getFilm().getRelease_year())
                        .setDirectorId(film.getFilm().getDirector_id())
                        .setCountryId(film.getFilm().getCountry_id())
                        .setImdb(film.getFilm().getImdb())
                        .setPoster(film.getPoster().getPath())
                        .addAllActors(film.getActors())
                        .addAllCategories(film.getCategories())
                        .setDirector(film.getDirector().getDirector())
                        .setCountry(film.getCountry().getCountry()).build()).collect(Collectors.toList());

        filmDetailList = (MovieDto.newBuilder()
                .addAllFilm(film_).build());

        responseObserver.onNext(com.example.movie.MovieDtoResponse.newBuilder()
                .setMovie(filmDetailList).build());
        responseObserver.onCompleted();
    }

    @Override
    public void getMoviesLike(MovieLikeRequest request, StreamObserver<MovieDtoResponse> responseObserver) {
        List<FilmDetail>  filmDetail = filmDetailRepo.findByLike(request.getTitle());
        com.example.movie.MovieDto filmDetailList;

        List<Film> film_ = filmDetail.stream()
                .map(film -> Film.newBuilder()
                        .setFilmId(film.getFilm().getId())
                        .setTitle(film.getFilm().getTitle())
                        .setDescription(film.getFilm().getDescription())
                        .setReleaseYear(film.getFilm().getRelease_year())
                        .setDirectorId(film.getFilm().getDirector_id())
                        .setCountryId(film.getFilm().getCountry_id())
                        .setImdb(film.getFilm().getImdb())
                        .setPoster(film.getPoster().getPath())
                        .addAllActors(film.getActors())
                        .addAllCategories(film.getCategories())
                        .setDirector(film.getDirector().getDirector())
                        .setCountry(film.getCountry().getCountry()).build()).collect(Collectors.toList());

        filmDetailList = (MovieDto.newBuilder()
                .addAllFilm(film_).build());

        responseObserver.onNext(com.example.movie.MovieDtoResponse.newBuilder()
                .setMovie(filmDetailList).build());
        responseObserver.onCompleted();
    }

    @Override
    public void getActorMovies(ActorMoviesRequest request, StreamObserver<ActorMovieResponse> responseObserver) {
        List<com.example.model.Film>  filmDetail = filmDetailRepo.getFilmsLike(request.getName());
        com.example.movie.ActorMovieDto filmDetailList;

        List<ActorFilms> film_ = filmDetail.stream()
                .map(film -> ActorFilms.newBuilder()
                        .setFilmId(film.getId())
                        .setTitle(film.getTitle())
                        .setDescription(film.getDescription())
                        .setReleaseYear(film.getRelease_year())
                        .setDirectorId(film.getDirector_id())
                        .setCountryId(film.getCountry_id())
                        .setImdb(film.getImdb())
                        .setPoster(film.getPoster())
                        .setActor(film.getActor())
                        .addAllCategories(film.getCategories())
                        .setDirector(film.getDirector())
                        .setCountry(film.getCountry()).build()).collect(Collectors.toList());

        filmDetailList = (ActorMovieDto.newBuilder()
                .addAllFilm(film_).build());

        responseObserver.onNext(com.example.movie.ActorMovieResponse.newBuilder()
                .setMovie(filmDetailList).build());
        responseObserver.onCompleted();



    }


    @Override
    public void getFavourites(FavouritesRequest request, StreamObserver<FavouritesResponse> responseObserver) {
        List<Favourite>  favsList = filmDetailRepo.getAllFavs();
        com.example.movie.FavouritesDTO favsResponse;

        List<FavMovies> favs_ = favsList.stream()
                .map(fav -> FavMovies.newBuilder()
                        .setFilmId(fav.getFilm_id())
                        .setTitle(fav.getMovie_id())
                        .setActors(fav.getActors())
                        .setDirector(fav.getDirector())
                        .setYear(fav.getYear()).build()).collect(Collectors.toList());

        favsResponse = (FavouritesDTO.newBuilder()
                .addAllFavMovies(favs_).build());

        responseObserver.onNext(FavouritesResponse.newBuilder()
                .setFilm(favsResponse).build());

        responseObserver.onCompleted();
    }

    @Override
    public void postFavourites(PostFavsRequest request, StreamObserver<PostFavsResponse> responseObserver) {
        PostFavsRequest postFavsRequest = PostFavsRequest.newBuilder().setFilmId(request.getFilmId()).build();
        Favourite favourite = new Favourite();
        favourite.setFilm_id(request.getFilmId());
        PostFavsResponse postFavsResponse = PostFavsResponse.newBuilder()
                        .setIsSaved(filmDetailRepo.saveFavs(favourite)).build();

        responseObserver.onNext(postFavsResponse);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteFavourites(DeleteFavsRequest request, StreamObserver<DeleteFavsResponse> responseObserver) {
        DeleteFavsRequest deleteFavsRequest = DeleteFavsRequest.newBuilder().setFilmId(request.getFilmId()).build();
        Favourite favourite = new Favourite();
        favourite.setFilm_id(request.getFilmId());
        DeleteFavsResponse deleteFavsResponse = DeleteFavsResponse.newBuilder()
                .setIsDeleted(filmDetailRepo.deleteFavs(favourite.getFilm_id())).build();

        responseObserver.onNext(deleteFavsResponse);
        responseObserver.onCompleted();
    }

    @Override
    public void getComments(CommentRequest request, StreamObserver<CommentResponse> responseObserver) {
        CommentRequest commentRequest = CommentRequest.newBuilder().setFilmId(request.getFilmId()).build();
        List<Comment> commentList = filmDetailRepo.getAllComments(commentRequest.getFilmId());

        CommentsDTO commentsDTO;

        List<Comments> comments = commentList.stream()
                .map(c -> Comments.newBuilder()
                        .setComment(c.getComment()).build()).collect(Collectors.toList());

        commentsDTO = CommentsDTO.newBuilder()
                .addAllComments(comments).build();

        responseObserver.onNext(CommentResponse.newBuilder()
                .setComments(commentsDTO).build());

        responseObserver.onCompleted();
    }

    @Override
    public void postComments(CommentPostRequest request, StreamObserver<CommentPostResponse> responseObserver) {
        CommentPostRequest commentPostRequest = CommentPostRequest.newBuilder()
                .setComment(request.getComment())
                .setFilmId(request.getFilmId()).build();

        FilmCommentDTO dto = new FilmCommentDTO();
        dto.setFilm_id(commentPostRequest.getFilmId());
        dto.setComment_text(commentPostRequest.getComment());

        CommentPostResponse commentPostResponse = CommentPostResponse.newBuilder()
                .setIsSaved(filmDetailRepo.postComments(dto)).build();

        responseObserver.onNext(commentPostResponse);
        responseObserver.onCompleted();
    }
}
