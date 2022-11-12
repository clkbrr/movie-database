import { paginate } from "./paginate.js";
import { displayButtons } from "./displayButtons.js";
import "../../components/lit-carousel/lit-carousel.js";

const searchText = document.querySelector('.search_text'); // Arama kutusu
const search_type = document.querySelector(".search_types"); // Arama tipi combobox (title-actor)

var selectedValue; // Arama tipi (title veya actor)

if (search_type != null) {
    search_type.addEventListener('change', () => {
        selectedValue = search_type.options[search_type.selectedIndex].text;
        getMovies();
    });
}

// Arama kutusu bos degilse ve enter'a basildiginda arama yap
if (searchText != null) {
    searchText.addEventListener('keydown', (event) => {
        if (event.keyCode == 13 && searchText.value != '') {
            if (index > 0 && selectedValue != '') {
                index = 0;
            }

            init();
        }
    }
    );
}

// Veritabanindaki tum filmleri veya title yada actor'e gore arama yapilan filmleri cek
async function getMovies() {
    let url;

    if (selectedValue == 'Title') {
        url = `http://localhost:8080/filmdetail/findbylike?expression=${searchText.value}`;
    } else if (selectedValue == 'Actor') {
        url = `http://localhost:8080/filmdetail/getactorfilms?name=${searchText.value}`;
    }
    else {
        url = `http://localhost:8080/filmdetail/getall`;
    }

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Favori filmler listesini veritabanından cek
export async function getFavs() {
    let url = 'http://localhost:8080/filmdetail/getallfavs';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Veritabanindaki favoriler tablosuna film ekle
export async function postFavourites(film_id) {
    // POST request using fetch()
    fetch("http://localhost:8080/filmdetail/saveFavs", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            film_id: film_id
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
            "Authorization": localStorage.getItem('tokenKey')
        }
    })
}

// Veritabanindaki favoriler tablosundan film sil
export async function deleteFavourites(film_id) {
    // DELETE request using fetch()
    fetch(`http://localhost:8080/filmdetail/deleteFavs/${film_id}`, {

        // Adding method type
        method: "DELETE",


        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
            "Authorization": localStorage.getItem('tokenKey')
        }
    })
}

export async function getComments(film_id) {
    let url;

    url = `http://localhost:8080/filmdetail/getallcomments/${film_id}`;

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function postComment(film_id, comment_text) {
    // POST request using fetch()
    fetch("http://localhost:8080/filmdetail/postComments", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            "film_id": film_id,
            "comment_text": comment_text
        }),

        // Adding headers to the request
        headers: {
            'Accept': 'application/json, text/plain',
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
            "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token, Authorization, Origin",
            "Authorization": localStorage.getItem('tokenKey')
        }
    })
}

// Bir film favori listesinde ekli mi
export function isFavExist(id) {
    var favExist = false;

    if (favList.favMovies != undefined) {
        for (let i = 0; i < favList.favMovies.length; i++) {
            let film_id = parseInt(favList.favMovies[i].filmId);

            if (id == film_id) {
                favExist = true;
            }
        }
    }

    return favExist;
}

const pageButtons = document.querySelector('.pagenumbers'); // Ana sayfa sayfa sayisi container'i
const tablePages = document.querySelector('.tblPages'); // Favoriler tablosu sayfa sayisi container'i
const commentPages = document.querySelector('.commentPages');// Comments sayfasındaki paging
const popup = document.querySelector('.popup');

let films;
var allMovies;
let pages = []; // Sayfa sayisina göre ayrilmis movie array (Ana sayfa icin)
let paginatedFavList = []; // Sayfa sayisina göre ayrilmis movie array (Favoriler tablosu icin)
let paginatedCommentsList = []; // Sayfa sayisina göre ayrilmis comment array (Comments sayfasi icin)
let index = 0; // Sayfa index'i (Ana sayfa icin)
let tableFavIndex = 0; // Sayfa index'i (Favoriler tablosu icin)
let commentPageIndex = 0; // Sayfa index'i (Comments icin)
let movie_;
let comments = [];
let favList = [];
let favs = [];
let sortDirection = false; // Filmleri imdb puanina gore filtrelerken desc mi asc mi olacağını belirler.
let filteredMovies = []; // Kategoriye gore filtrelenmis film arrayi.
// Ana sayfadaki filmleri ekrana getiren metodu ve sayfa numaralarini gosteren metodu cagirir
function searchMovie() {
    prepareMovies(pages[index]);
    displayButtons(pageButtons, pages, index);
}

// Ana sayfadaki filmleri ekrana getiren metot
function prepareMovies(movies) {
    let i = 0;
    let moviecount = 0;

    var movs = document.querySelectorAll('.movs'); // 3 Adet DIV (Her DIV'de 3 tane film bulunur)

    movs.forEach(mov => {
        mov.innerHTML = "";
    });

    document.querySelector('#movies').style.height = '300px'; // ".movs" divlerini içeren div
    document.querySelector('.data_table').innerHTML = "";
    document.querySelector('.img-cont').innerHTML = "";

    if (movies != undefined) {
        movies.forEach(movie => {
            let movie_card = document.createElement('movie-card');
            if (selectedValue == 'Actor' && searchText.value != '') {
                movie_card.setAttribute('movie', JSON.stringify(movie));
                if (movie.actor.toLowerCase().includes(searchText.value.toLowerCase())) {
                    movie_card.setAttribute('film_id', movie.filmId);
                    movie_card.setAttribute('title', movie.title);
                    movie_card.setAttribute('imdb', movie.imdb);
                    movie_card.setAttribute('actor', movie.actor);
                    movie_card.setAttribute('year', movie.releaseYear);
                    movie_card.setAttribute('poster', movie.poster);
                    movie_card.setAttribute('director', movie.director);
                    movie_card.setAttribute('description', movie.description);
                    movie_card.setAttribute('categories', movie.categories);
                    movie_card.setAttribute('country', movie.country);
                }

                else if (selectedValue == 'Actor' && !movie.actor.toLowerCase().includes(searchText.value.toLowerCase()) && searchText.value != '') {
                    alert("Actor not found!!") ? "" : location.reload();
                }
            }

            else {
                if (selectedValue == 'Title' && !movie.title.toLowerCase().includes(searchText.value.toLowerCase())) {
                    if (films.film != filteredMovies) {
                        alert("Movies not found!!") ? "" : location.reload();
                    }
                }
                else if ((selectedValue == 'Title' && movie.title.toLowerCase().includes(searchText.value.toLowerCase())) || searchText.value == '') {
                    movie_card.setAttribute('movie', JSON.stringify(movie));
                    movie_card.setAttribute('film_id', movie.filmId);
                    movie_card.setAttribute('title', movie.title);
                    movie_card.setAttribute('year', movie.releaseYear);
                    movie_card.setAttribute('imdb', movie.imdb);
                    movie_card.setAttribute('poster', movie.poster);
                    movie_card.setAttribute('director', movie.director);
                    movie_card.setAttribute('actors', movie.actors);
                    movie_card.setAttribute('categories', movie.categories);
                    movie_card.setAttribute('country', movie.country);
                    movie_card.setAttribute('description', movie.description);
                }

            }

            // ----- ".movs" divlerinin her biri içerisine 3'er adet oacak sekilde film yerleştir -----
            var children = document.getElementById('movies').querySelectorAll('.movs');
            children.item(i).appendChild(movie_card);

            moviecount++;

            if (moviecount == 3) {
                i++;
                moviecount = 0;
            }

            //----------------------------------------------------------------------------------------

        });

        var img_container = document.querySelector('.img-cont');
        let lit_carousel = document.createElement('lit-carousel');
        lit_carousel.setAttribute('movies', JSON.stringify(allMovies));
        img_container.appendChild(lit_carousel);
    }
    else {
        console.log(movies);
        // alert('Movies not found!!') ? "" : location.reload();
    }

    if ((selectedValue == '' && searchText.value != '')) {
        alert('Movies not found!!') ? "" : location.reload();
    }
}

// Favoriler tablosunu ekrana getiren metot
export async function prepareTable() {
    favs = await getFavs();
    if (favs.favMovies != undefined) {
        paginatedFavList = paginate(favs.favMovies, 5); // Favori filmler array'ini sayfalamaya hazir hale getirir
        displayButtons(tablePages, paginatedFavList, tableFavIndex); // Sayfa numaralarini sayfada gosterir
    }
    else {
        let emptyMovieList = [];
        paginatedFavList = paginate(emptyMovieList, 5);
        tablePages.innerHTML = "";
    }

    // sayfa numarası 1'den büyükse ve o sayfa tamamen boşaltılırsa tabloyu update et
    if (tableFavIndex > 0 && paginatedFavList[tableFavIndex] == undefined) {
        tableFavIndex = 0;
    }

    document.querySelector('.data_table').innerHTML = "";
    document.querySelector('.pagenumbers').style.display = 'none';
    document.querySelector('.commentPages').style.display = 'none';
    document.querySelector('#movies').style.display = 'none';
    document.querySelector('.filter-cont').style.display = 'none';
    document.querySelector('.details').style.display = 'none';
    document.querySelector('#app').style.display = 'none'; // Ana sayfadaki arama kutusunu kapat
    searchText.value = "";
    let data_table = document.createElement('data-table');

    // Sayfalamaya gore duzenlenmis favori filmler array'ini component'e gonderir
    data_table.setAttribute('pages', paginatedFavList);
    data_table.setAttribute('movies', JSON.stringify(paginatedFavList[tableFavIndex]));
    data_table.setAttribute('index', tableFavIndex);

    document.querySelector('.data_table').append(data_table);

}

export function preparePopup(movie) {
    let popup = document.createElement('lit-popup');
    if (selectedValue == 'Actor') {
        popup.setAttribute('film_id', JSON.parse(movie).film_id);
        popup.setAttribute('title', JSON.parse(movie).title);
        popup.setAttribute('actor', JSON.parse(movie).actor);
        popup.setAttribute('year', JSON.parse(movie).releaseYear);
        popup.setAttribute('poster', JSON.parse(movie).poster);
        popup.setAttribute('director', JSON.parse(movie).director);
        popup.setAttribute('description', JSON.parse(movie).description);
        popup.setAttribute('category', JSON.parse(movie).categories);
        popup.setAttribute('country', JSON.parse(movie).country);
    }
    else {
        popup.setAttribute('film_id', JSON.parse(movie).film_id);
        popup.setAttribute('title', JSON.parse(movie).title);
        popup.setAttribute('actor', JSON.parse(movie).actors);
        popup.setAttribute('year', JSON.parse(movie).releaseYear);
        popup.setAttribute('poster', JSON.parse(movie).poster);
        popup.setAttribute('director', JSON.parse(movie).director);
        popup.setAttribute('description', JSON.parse(movie).description);
        popup.setAttribute('category', JSON.parse(movie).categories);
        popup.setAttribute('country', JSON.parse(movie).country);
    }

    document.querySelector('.popup').appendChild(popup);
}

export async function prepareComment(movie) {

    document.querySelector('.data_table').style.display = 'none';
    document.querySelector('.pagenumbers').style.display = 'none';
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.details').innerHTML = "";
    document.querySelector('#movies').style.display = 'none';
    document.querySelector('.filter-cont').style.display = 'none';
    document.querySelector('#app').style.display = 'none';

    movie_ = movie;
    comments = await getComments(JSON.parse(movie).filmId);
    let commentPage = document.createElement('lit-comment');

    commentPage.setAttribute('movie', movie);

    if (selectedValue == 'Actor') {
        commentPage.setAttribute('film_id', JSON.parse(movie).filmId);
        commentPage.setAttribute('title', JSON.parse(movie).title);
        commentPage.setAttribute('actor', JSON.parse(movie).actor);
        commentPage.setAttribute('year', JSON.parse(movie).releaseYear);
        commentPage.setAttribute('poster', JSON.parse(movie).poster);
        commentPage.setAttribute('director', JSON.parse(movie).director);
        commentPage.setAttribute('description', JSON.parse(movie).description);
        commentPage.setAttribute('category', JSON.parse(movie).categories);
        commentPage.setAttribute('country', JSON.parse(movie).country);
    }
    else {
        commentPage.setAttribute('film_id', JSON.parse(movie).filmId);
        commentPage.setAttribute('title', JSON.parse(movie).title);
        commentPage.setAttribute('actor', JSON.parse(movie).actors);
        commentPage.setAttribute('year', JSON.parse(movie).releaseYear);
        commentPage.setAttribute('poster', JSON.parse(movie).poster);
        commentPage.setAttribute('director', JSON.parse(movie).director);
        commentPage.setAttribute('description', JSON.parse(movie).description);
        commentPage.setAttribute('category', JSON.parse(movie).categories);
        commentPage.setAttribute('country', JSON.parse(movie).country);
    }


    //var keys = Object.keys(comments);

    if (comments.length !== 0) {
        paginatedCommentsList = paginate(comments, 4);
        displayButtons(commentPages, paginatedCommentsList, commentPageIndex);

    }
    else {
        let comment_ = ["Henüz yorum yapılmamış."];
        paginatedCommentsList = paginate(comment_, 4);
        displayButtons(commentPages, paginatedCommentsList, commentPageIndex);
    }

    commentPage.setAttribute('comments', JSON.stringify(paginatedCommentsList[commentPageIndex]));

    document.querySelector('.details').appendChild(commentPage);
}

const init = async () => {
    films = await getMovies();
    if (searchText.value == '') {
        allMovies = films.film;
    }

    pages = paginate(films.film, 9); // Veritabanindan cekilen filmleri sayfalamaya hazir hale getirir
    favList = await getFavs();
    searchMovie();
    favs = favList;
    paginatedFavList = paginate(favs, 5); // Veritabanindan cekilen favori filmleri sayfalamaya hazir hale getirir
}

pageButtons.addEventListener('click', function (e) {
    if (e.target.classList.contains('pagenumbers')) {
        return;
    }

    if (e.target.classList.contains('page-btn')) {
        index = parseInt(e.target.dataset.index);
    }

    if (e.target.classList.contains('next-btn')) {
        index++;

        if (index > pages.length - 1) {
            index = 0;
        }
    }

    if (e.target.classList.contains('prev-btn')) {
        index--;

        if (index < 0) {
            index = pages.length - 1;
        }
    }

    searchMovie();
})

tablePages.addEventListener('click', function (e) {
    if (e.target.classList.contains('tblPages')) {
        return;
    }

    if (e.target.classList.contains('page-btn')) {
        tableFavIndex = parseInt(e.target.dataset.index);
    }

    if (e.target.classList.contains('next-btn')) {
        tableFavIndex++;

        if (tableFavIndex > paginatedFavList.length - 1) {
            tableFavIndex = 0;
        }
    }

    if (e.target.classList.contains('prev-btn')) {
        tableFavIndex--;

        if (tableFavIndex < 0) {
            tableFavIndex = paginatedFavList.length - 1;
        }
    }

    prepareTable();
})

commentPages.addEventListener('click', function (e) {
    if (e.target.classList.contains('commentPages')) {
        return;
    }

    if (e.target.classList.contains('page-btn')) {
        commentPageIndex = parseInt(e.target.dataset.index);
    }

    if (e.target.classList.contains('next-btn')) {
        commentPageIndex++;

        if (commentPageIndex > paginatedCommentsList.length - 1) {
            commentPageIndex = 0;
        }
    }

    if (e.target.classList.contains('prev-btn')) {
        commentPageIndex--;

        if (commentPageIndex < 0) {
            commentPageIndex = paginatedCommentsList.length - 1;
        }
    }

    prepareComment(movie_);
})

popup.addEventListener("DOMNodeInserted", function () {
    popup.style.pointerEvents = "auto";
    const children = document.getElementById('movies').getElementsByTagName('div');
    const appHeader = document.getElementsByTagName('app-header');
    const searchField = document.getElementById('app');
    const filter_section = document.querySelector('.filter-cont');

    for (let i = 0; i < children.length; i++) {
        children[i].classList.add('disabled');
    }

    appHeader[0].classList.add('disabled');

    searchField.classList.add('disabled');

    pageButtons.classList.add('disabled');

    filter_section.classList.add('disabled');
});

popup.addEventListener("DOMNodeRemoved", function () {
    popup.style.pointerEvents = "none";
    const children = document.getElementById('movies').getElementsByTagName('div');
    const appHeader = document.getElementsByTagName('app-header');
    const searchField = document.getElementById('app');
    const filter_section = document.querySelector('.filter-cont');

    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove('disabled');
    }

    appHeader[0].classList.remove('disabled');

    searchField.classList.remove('disabled');

    pageButtons.classList.remove('disabled');

    filter_section.classList.remove('disabled');
});

window.addEventListener('load', init);

// Imdb puanina gore filmleri filtreler
window.addEventListener('load', () => {
    let sortDirection = false;
    const litFilter = document.querySelector("lit-filter");
    const buttn = litFilter.shadowRoot.querySelector('button');
    buttn.addEventListener('click', () => {
        sortDirection = !sortDirection;
        if (sortDirection) {
            buttn.innerHTML = '^';
        } else {
            buttn.innerHTML = 'v';
        }
        sortByImdbScore();
        pages = paginate(films.film, 9);
        searchMovie();

    })

});

function sortByImdbScore() {
    //let moviess = JSON.parse(this.movies);
    const dataType = typeof films.film[0].imdb;
    sortDirection = !sortDirection;
    switch (dataType) {
        case 'number':
            if (sortDirection) {
                films.film.sort(function (b, a) {
                    return a.imdb - b.imdb;
                });
            } else {
                films.film.sort(function (a, b) {
                    return a.imdb - b.imdb;
                });
            }
            break;
        default:
            break;
    }
}
//---------------------------------------------------------------------


//Filmleri kategoriye göre filtreler
let selectedCategoryButtonCount = 0; // Seçili kategoriler

function filter() {
    setTimeout(() => {
        const litFilter = document.querySelector("lit-filter");
        let category_btns = litFilter.shadowRoot.querySelectorAll('.category_btn');
        let get_filter_btn = litFilter.shadowRoot.querySelector('.filter_movies');
        let remove_filter = litFilter.shadowRoot.querySelector('.remove_filter');
        let categories = [];

        category_btns.forEach(btn => {
            let addFilter = false;
            let isButtonSelected = false;

            btn.addEventListener('click', () => {
                addFilter = !addFilter

                if (addFilter) {
                    if (selectedCategoryButtonCount < 2) {
                        categories.push(btn.innerHTML);
                        btn.style.backgroundColor = '#CF0A0A';
                        selectedCategoryButtonCount++;
                        isButtonSelected = true;
                    }
                } else {
                    var index = categories.indexOf(btn.innerHTML);
                    if (index !== -1) {
                        categories.splice(index, 1);
                    }

                    if (isButtonSelected) {
                        btn.style.backgroundColor = '#AEBDCA';
                        selectedCategoryButtonCount--;
                        isButtonSelected = false;
                    }
                }

                if (selectedCategoryButtonCount <= 2) {
                    get_filter_btn.addEventListener('click', () => {
                        filterByCategory(categories)
                    });
                }
            });
        });

        remove_filter.addEventListener('click', () => {
            categories = [];
            window.location.reload();
            category_btns.forEach(btn => {
                btn.style.pointerEvents = "auto";
            });
        });
    }, 500);
}

filter();

function filterByCategory(categoryList) {
    films.film.forEach(mov => {
        mov.categories.forEach(category => {
            categoryList.forEach(element => {
                if (!filteredMovies.includes(mov) && element == category) {
                    filteredMovies.push(mov);
                }
            });

        })
    });

    /* switch (btn.innerHTML) {
        case 'Drama':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }

            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Drama') {
                        filteredMovies.push(mov);
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Romance':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Romance') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Horror':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Horror') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Action':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Action') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'History':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'History') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Crime':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Crime') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Thriller':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Thriller') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Mystery':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Mystery') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
        case 'Scifi':
            if ((films.film == filteredMovies) || (searchText.value != '')) {
                films = await getMovies();
                filteredMovies = [];
            }
            films.film.forEach(mov => {
                mov.categories.forEach(category => {
                    if (category == 'Scifi') {
                        filteredMovies.push(mov)
                    }
                })
            });
            selectedCategoryButtonCount++;
            break;
    } */

    if (selectedCategoryButtonCount <= 2) {
        if (filteredMovies.length != 0) {
            films.film = filteredMovies;
            pages = paginate(films.film, 9);

            films.film.forEach(film => {
                categoryList.forEach(category => {
                    if (film.categories.includes(category)) {
                        if (index > 0) {
                            index = 0;
                        }
                        searchMovie();
                    }
                });
            })
        }

        filteredMovies = [];
    }
}
//---------------------------------------------------------------------
