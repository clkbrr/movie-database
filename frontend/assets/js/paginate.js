// Kac tane film varsa, istenilen sayfa sayisi kadar sayfalama yapar
export const paginate = (movies, moviesPerPage) => {
    //const moviesPerPage = 3; // Bir sayfada kaç film görünecek
    const numberOfPages = Math.ceil(movies.length / moviesPerPage); // Toplamda kaç sayfa olacak

    const newMovies = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * moviesPerPage;
        return movies.slice(start, start + moviesPerPage);
    });

    return newMovies;
}
