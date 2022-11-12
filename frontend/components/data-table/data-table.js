import xSmSVG from '@alaskaairux/icons/dist/icons/interface/x-sm_es6';
import { LitElement, html, css } from "lit-element";
import { deleteFavourites, prepareTable } from "../../assets/js/app";
import '/components/get-api.js';

export class DataTable extends LitElement {

    static styles = css`

     * {
      box-sizing: border-box;
    }

    body {
      margin: 0px;
    }

    h2 {
        display:flex;
        justify-content:center;
        align-items:center;
        color:#97D2EC;
    }
* {
    box-sizing: border-box;
}
body>div{
    min-height: 100vh;
    display: flex;
    font-family: 'Roboto', sans-serif;
}
.table_responsive {
    max-width: 900px;
    border: 1px solid #00bcd4;
    background-color: #efefef33;
    padding: 15px;
    overflow: auto;
    margin: auto;
    margin-bottom: 15px;
    border-radius: 4px;
    position:relative;
}

#search {
    position:absolute;
    right: 0;
    margin-right:190px;
    margin-top:30px;
}

table {
    width: 100%;
    font-size: 13px;
    color: #444;
    white-space: nowrap;
    border-collapse: collapse;
    overflow-y: scroll;
    overflow-x: hidden;
}
table>thead {
    background-color: #00bcd4;
    color: #fff;
}
table>thead th {
    padding: 15px;
    cursor:pointer;
}
table th,
table td {
    border: 1px solid #00000017;
    padding: 10px 15px;
}

.action_btn {
    display: flex;
    justify-content: center;
    width: 60px;
    height: 60px;
    gap: 10px;
    //text-decoration: none;
    color: red;
    background: transparent;
    position:relative;
    border: none;
    display: inline-block;
    //padding: 7px 20px;
    font-weight: bold;
    border-radius: 3px;
    transition: 0.3s ease-in-out;
}

.action_btn > svg {
  pointer-events: none;
}

.action_btn:after {
    position: absolute;
    width: 50px;
    height: 50px;
  }

.action_btn:hover {
    box-shadow: 0 3px 8px #0003;
}

table>tbody>tr {
    background-color: #fff;
    transition: 0.3s ease-in-out;
    text-align:center;
}
table>tbody>tr:nth-child(even) {
    background-color: rgb(238, 238, 238);
}
table>tbody>tr:hover{
    filter: drop-shadow(0px 2px 6px #0002);
}

.selectAllBtn {
    display:inline-block;
    margin-left:10px;
    margin-bottom: 10px;
}

.delete_all_button {
    display:inline-block;
    margin-left:180px;
    margin-bottom: 10px;
}

.delete_all_button div a, .selectAllBtn div a  {
    text-decoration: none;
    color: #666;
    background: #fff;
    border: 1px solid;
    display: inline-block;
    padding: 7px 20px;
    margin-top: 15px;
    font-weight: bold;
    border-radius: 3px;
    transition: 0.3s ease-in-out;
}

.disabled {
    display:inline-block;
    margin-left:15px;
    margin-bottom: 10px;
}

.disabled div a {
    pointer-events: none;
    cursor: default;
    color: grey;
}

.delete_all_button div>a:nth-child(1) {
    border-color: #26a69a;
}
.delete_all_button div>a:nth-child(2) {
    border-color: orange;
}
.delete_all_button div>a:hover {
    box-shadow: 0 3px 8px #0003;
}

.selectAllBtn div>a:nth-child(1) {
    border-color: #26a69a;
}
.selectAllBtn div>a:nth-child(2) {
    border-color: orange;
}
.selectAllBtn div>a:hover {
    box-shadow: 0 3px 8px #0003;
}

.listEmpty {
    display:none;
}
    `;
    static get properties() {
        return {
            movies: {},
            id: { type: Number },
            sortDirection: { type: Boolean },
            favPages: {},
            index: { type: Number },
            movie: { type: String },
            director: { type: String },
            actors: { type: String },
            year: { type: String },
            isChecked: { type: Boolean }
        };
    }

    constructor() {
        super();

        this.movies = [];

        this.sortDirection = false;

        this.movie = this.getAttribute('movie');
        this.favPages = this.getAttribute('pages');
        this.index = this.getAttribute('index');
        this.director = this.getAttribute('director');
        this.actors = this.getAttribute('actors');
        this.year = this.getAttribute('year');

        this.isChecked = false;
    }

    // Tabloda filtreleme yapar
    updated() {
        this.favPages = this.getAttribute('pages');

        this.index = this.getAttribute('index');

        const searchInput = this.shadowRoot.querySelector('#search');
        const rows = this.shadowRoot.querySelectorAll('tbody tr');

        // Filter table
        if (rows.length > 0 && this.getAttribute('movies').length > 9) {
            searchInput.addEventListener('keyup', function (event) {
                const q = event.target.value.toLowerCase();

                rows.forEach(row => {
                    row.cells[1].textContent.toLowerCase().includes(q)
                        ? (row.style.display = "table-row") : (row.style.display = "none");
                });
            });
        }

        // If list is empty disable delete button
        if (rows.length == 1 && this.getAttribute('movies').length <= 9) {
            this.shadowRoot.querySelector('.delete_all_button').classList.add('disabled');
        }
    }

    // Iconlar icin
    generateIconHtml(svgContent) {
        const dom = new DOMParser().parseFromString(svgContent, 'text/html'),
            svg = dom.body.firstChild;

        return svg
    }


    // Tabloyu olusturur ve filmleri listeler
    listMovies() {
        if (this.getAttribute('movies').length > 9) {
            this.movies = JSON.parse(this.getAttribute('movies'));
        }

        return this.getAttribute('movies').length > 9 ?
            html`
        <div class="selectAllBtn">
            <div>
                <input type="checkbox" @click="${() => {
                    var table = this.shadowRoot.querySelector('table').tBodies[0];
                    var row;
                    var chkbox;

                    if (this.isChecked == false) {
                        for (let i = 0; i < table.rows.length; i++) {
                            row = table.rows[i];
                            chkbox = row.cells[0].querySelector('.checkBox');
                            chkbox.checked = true;
                        }

                        this.isChecked = true;
                    }
                    else {
                        for (let i = 0; i < table.rows.length; i++) {
                            row = table.rows[i];
                            chkbox = row.cells[0].querySelector('.checkBox');
                            chkbox.checked = false;
                        }

                        this.isChecked = false;
                    }
                }}"><span style="color:green; font-weight:bold;">Select All</span> 
            </div>
        </div>

        <input type="text" name="search" id="search" class="seacrhInput" placeholder="Search...">
        <div class="table_responsive">
              <table>
                <thead>
                     <tr>
                        <th>Select</th>
                        <th @click="${() => {
                    this.sortColumn('title');
                }}">Movie</th>
                        <th @click="${() => {
                    this.sortColumn('director');
                }}">Director</th>
                        <th @click="${() => {
                    this.sortColumn('actors');
                }}">Stars</th>
                        <th  @click="${() => {
                    this.sortColumn('year');
                }}">Year</th>
                        <th>Action</th>
                    </tr >
                </thead >

           <tbody>
           ${(this.movies).map((mov, index) => {
                    return html`
                      <tr>
                     <td><input type="checkbox" class="checkBox"></td>
                     <td>${mov.title}</td>
                     <td>${mov.director}</td>
                     <td>${mov.actors}</td>
                     <td>${mov.year}</td>
                     <td>
                        <button class="action_btn"
                            @click="${(e) => {
                            var clickedButton = e.target;
                            var table = this.shadowRoot.querySelector('table').tBodies[0];

                            for (let i = 0; i < table.rows.length; i++) {
                                var row = table.rows[i];
                                //var chkbox = row.cells[0].querySelector('.checkBox');

                                if (row.cells[5].querySelector('.action_btn') === clickedButton) {
                                    table.deleteRow(i);
                                    deleteFavourites(mov.filmId);

                                    setTimeout(() => {
                                        prepareTable();
                                    }, 100);
                                }

                                // if (chkbox.checked == true) {
                                //     if (row.cells[5].querySelector('.action_btn') === clickedButton) {
                                //         table.deleteRow(i);
                                //         deleteFavourites(mov.filmId);

                                //         setTimeout(() => {
                                //             prepareTable();
                                //         }, 100);
                                //     }
                                // }
                            }
                        }
                        }">
                
                      ${this.generateIconHtml(xSmSVG.svg)}</button>
                     </td>
                   </tr > `

                })}
    </tbody>
              </table > 
            </div > ` :
            this.index == 0 ? html`
            <table >
               <thead>
                  <tr>
                    <th></th>
                  </tr>
               </thead>
               <tbody>
                <tr>
                    <td>List is empty</td>
                </tr>
               </tbody>
            </table >` : this.updateTable();
    }


    updateTable() {
        prepareTable();
        return;
    }

    // Secilmis olan butun filmleri tablodan ve veritabanindan silen butonu ekler ve fonksiyonel yapar.
    deleteAllSelected() {
        // return this.shadowRoot.querySelector('table') != null ?
        return html`
    <div class="delete_all_button" >
        <div>
            <a href="#" id="deleteBtn" @click="${() => {
                var table = this.shadowRoot.querySelector('table').tBodies[0];
                var checkedRows = [];
                var checkedMovies = [];

                for (let i = 0; i < table.rows.length; i++) {

                    if (table.rows[i].querySelector('.checkBox').checked) {
                        checkedRows.push(table.rows[i]);
                        checkedMovies.push(this.movies[i].filmId);
                    }

                }

                for (let j = 0; j < checkedMovies.length; j++) {
                    deleteFavourites(checkedMovies[j]);
                }

                setTimeout(() => {
                    this.updateTable();
                }, 100);


                for (var k = 0; k < checkedRows.length; k++) {
                    checkedRows[k].parentNode.removeChild(checkedRows[k]);
                }
            }

            }">Delete</a>
                </div>
                
        </div> `;

    }

    // Tabloda sorting yapar
    sortColumn(columnName) {
        const dataType = typeof this.movies[0][columnName];
        this.sortDirection = !this.sortDirection;
        switch (dataType) {
            case 'string':
                this.sortStringColumn(this.sortDirection, columnName);
                break;
            default:
                break;
        }
    }

    sortStringColumn(sortDirection, columnName) {
        if (sortDirection) {
            this.movies.sort((a, b) => a[columnName] > b[columnName] ? 1 : -1);
        } else {
            this.movies.sort((a, b) => a[columnName] < b[columnName] ? 1 : -1);
        }
    }

    render() {
        return html`
    <div class="container" >
            <h2>Favourites</h2>
            <!-- <get-api url='http://localhost:8080/favourites/getall'> method='GET'></get-api>  -->
            <div class='movies-block'>
                ${this.deleteAllSelected()} 
                ${this.listMovies()} 
    }
            </div>
        </div>
    `;
    }
}

customElements.define('data-table', DataTable);