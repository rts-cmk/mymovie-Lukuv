// Var 
const movieSec = document.getElementById("movieSec")
const imgUrl = `https://image.tmdb.org/t/p/w500`

let search = window.location.search
let params = new URLSearchParams(search)
let id = params.get("id")

fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(movie => {
        displayMovieDetails(movie);
        getMovieVideo(movie);
    })

// function to convert minutes to hours and minutes
function minutesToHours(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
}

async function getMovieVideo(movie) {
    let resMovieId = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    let movieId = await resMovieId.json();
    return movieId.results[0].key;

}

async function getMovieCast(movie) {
    let resCredits = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    let movieCredits = await resCredits.json();
    console.log(movieCredits);
    
    return movieCredits.cast;

}


// function to display movie details
async function displayMovieDetails(movie) {
    //console.log(movie);

    const cast = await getMovieCast(movie);
    const videoKey = await getMovieVideo(movie);

    let movieDetails = /*html*/`
    <figure class="hero">
        
        <div class="hero-video">
            <iframe width="100%" height="auto" 
                src="https://www.youtube.com/embed/${videoKey}"  
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
        </div>

        <div class="hero-top">
            <a href="/index.html" class="backBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </a>
            <label class="switch switchDetails">
                <input type="checkbox" id="modeToggle">
                <span class="slider"></span>
            </label>
        </div>
    </figure>
    <article class="movieDetailsContent">
        <div class="movieDetailsTitle">
            <h2>${movie.title}</h2>
            <svg class="iconsDarkMode" width="20" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2127 0.0952657C13.4531 0.186901 13.6446 0.331356 13.7869 0.528887C13.9289 0.726308 14 0.944767 14 1.18452V14.8156C14 15.0554 13.929 15.2738 13.7868 15.4712C13.6446 15.6688 13.4531 15.8134 13.2126 15.9049C13.0741 15.9613 12.9136 15.9893 12.7313 15.9893C12.3814 15.9893 12.0788 15.8765 11.8235 15.6513L7.00004 11.1671L2.17653 15.6512C1.91396 15.8836 1.61151 16 1.26868 16C1.101 16 0.940528 15.9683 0.787521 15.905C0.54694 15.8134 0.355471 15.6688 0.213305 15.4714C0.0711784 15.2738 0 15.0555 0 14.8156V1.18438C0 0.944619 0.0711784 0.72616 0.213305 0.528739C0.355471 0.331319 0.54694 0.186679 0.787521 0.0951175C0.940681 0.0317429 1.101 0 1.26868 0H12.7313V0.000148158C12.8991 0.000148158 13.0595 0.031891 13.2127 0.0952657ZM7.97354 10.1942L12.6001 14.4876V1.35377H1.40015V14.4876L6.02667 10.1942L7.00006 9.29545L7.97354 10.1942Z" fill="black" /></svg>
        </div>
        <p class="movie-rating">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 9.5L2.47329 11.3541L3.14683 7.42705L0.293661 4.6459L4.23664 4.07295L6 0.5L7.76336 4.07295L11.7063 4.6459L8.85317 7.42705L9.52671 11.3541L6 9.5Z" fill="#FFC319"/></svg>${movie.vote_average.toFixed(1)}/10 IMDb
        </p>
        <ul class="genresUl">
            ${movie.genres.map(genre => `<li class="genre">${genre.name}</li>`).join("")}
        </ul>
        <ul class="movieDetailsInfo">
            <li><span>Length</span>${minutesToHours(movie.runtime)}</li>
            <li><span>Language</span>${movie.spoken_languages[0].english_name}</li>
            <li><span>Rating</span></li>
        </ul>

        <h3 class="section-titles">Description</h3>
        <p>${movie.overview}</p>
        <h3 class="section-titles">Cast</h3>
        <ul class="castUl">
        ${cast.map(actor => {
            return /*html*/`
            <figure class="castCard">
                <img src="${imgUrl}${actor.profile_path}" alt="">
                <figcaption>
                    <p class="actorName">${actor.name}</p>
                    <p class="actorCharacter">${actor.character}</p>
                </figcaption>
            </figure>`
        }).join("")}
        </ul>


    </article>
    `
    movieSec.insertAdjacentHTML("beforeend", movieDetails)
}
