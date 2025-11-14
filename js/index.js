//Var
const nowShowingUl = document.getElementById("nowShowingUl")
const popularUl = document.getElementById("popularUl")
const imgUrl = `https://image.tmdb.org/t/p/w500`



// Fetchig data from the API
fetch("https://api.themoviedb.org/3/movie/now_playing", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(moviesNowShowing => {

        displayMoviesNowShowing(moviesNowShowing)
    })

fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
    }
})
    .then(res => res.json())
    .then(moviesPopular => {
        displayMoviesPopular(moviesPopular)
    })

// function to display now showing movies
function displayMoviesNowShowing(moviesNowShowing) {
    moviesNowShowing.results.map(movie => {
        let movieCard = /*html*/`
        <a href="/html/details.html?id=${movie.id}">
        <figure class="nowShowingCard">
            <div class="nowShowingImg"><img src="${imgUrl + movie.poster_path}" alt="${movie.title}"></div>
            <figcaption class="nowShowingCardText">
                <h3 class="card-titles">${movie.title}</h3>
                <p class="movie-rating">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 9.5L2.47329 11.3541L3.14683 7.42705L0.293661 4.6459L4.23664 4.07295L6 0.5L7.76336 4.07295L11.7063 4.6459L8.85317 7.42705L9.52671 11.3541L6 9.5Z" fill="#FFC319"/></svg>
                ${movie.vote_average.toFixed(1)}/10 IMDb</p>
            </figcaption>
        </figure>
        </a>
        `
        nowShowingUl.insertAdjacentHTML("beforeend", movieCard)
    }).join("")
}
// function to convert minutes to hours and minutes
function minutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}


// function to display popular movies some details
function displayMoviesPopular(moviesPopular) {

    moviesPopular.results.map(movieId => {

        fetch(`https://api.themoviedb.org/3/movie/${movieId.id}`, {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(movie => {

    let movieCard = /*html*/`
        <figure class="popularCard">
            <a href="/html/details.html?id=${movie.id}" class="popularCardImg">
                <img src="${imgUrl + movie.poster_path}" alt="">
            </a>
            <figcaption class="popularCardText">
                <a href="/html/details.html?id=${movie.id}"><h3 class="card-titles popular-titles">${movie.title}</h3></a>
                <p class="movie-rating">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 9.5L2.47329 11.3541L3.14683 7.42705L0.293661 4.6459L4.23664 4.07295L6 0.5L7.76336 4.07295L11.7063 4.6459L8.85317 7.42705L9.52671 11.3541L6 9.5Z" fill="#FFC319"/></svg>
                ${movie.vote_average.toFixed(1)}/10 IMDb</p>
                <ul class="genresUl">
                    ${movie.genres.map(genre => {
                        return `<li class="genre">${genre.name}</li>`
                    }).join("")}
                </ul>
                <p class="movie-runtime">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer-icon lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
                    ${minutesToHours(movie.runtime)}
                </p>

            </figcaption>
         </figure>
        `
                popularUl.insertAdjacentHTML("beforeend", movieCard)
            })

    }).join("")

}