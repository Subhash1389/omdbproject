const key = '48aa722f';
var searchInput = document.getElementById('Input');




searchInput.addEventListener('input', findMovies);


async function findMovies() {
    
    const url = `https://www.omdbapi.com/?s=${(searchInput.value).trim()}&page=1&apikey=${key}`
    const res = await fetch(`${url}`);
    const data = await res.json();
    

    if (data.Search) {
        //Calling the function to display list of the movies related to the user search
        displayMovieList(data.Search)
    }
}



async function displayMovieList(movies) {
    console.log(movies);
    var output = '';
    //Traversing over the movies list which is passed as an argument to our function
    for (i of movies) {

        var img = '';
        if (i.Poster != 'N/A') {
            img = i.Poster;
        }
        else {
            img = 'img/blank-poster.webp';
        }
        var id = i.imdbID;
        const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`
        const res = await fetch(`${url}`);
        const data = await res.json();

        //Appending the output through string interpolition
        output += `

        <div class="fav-item">
            <div class="fav-poster">
            <img src=${img} alt="Favourites Poster">
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name">${data.Title}</p>
                        <p class="fav-movie-rating">${data.Released}</p>
                        <p class="fav-movie-rating">${data.Runtime}</p>
                        <p class="fav-movie-rating">${data.Genre}</p>
                        <p class="fav-movie-rating">${data.Director}</p>
                        <p class="fav-movie-rating">${data.Actors}</p>
                    </div>
                    
                </div>
            </div>
        </div>

       `
    }
    //Appending this to the movie-display class of our html page
    document.querySelector('.fav-container').innerHTML = output;
    console.log("here is movie list ..", movies);
}