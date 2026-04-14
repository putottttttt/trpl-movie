const apiKey = "3956934c";

// tombol search
document.getElementById("searchButton").addEventListener("click", searchMovie);

// enter key
document.getElementById("searchInput").addEventListener("keyup", function(e) {
    if (e.key === "Enter") {
        searchMovie();
    }
});

// function search
function searchMovie() {
    const keyword = document.getElementById("searchInput").value;

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`)
        .then(response => response.json())
        .then(data => {
            let movies = data.Search;
            let output = "";

            if (!movies) {
                document.getElementById("movieList").innerHTML = "<p>Film tidak ditemukan</p>";
                return;
            }

            movies.forEach(movie => {
                output += `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100">
                            <img src="${movie.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${movie.Title}</h5>
                                <p>${movie.Year}</p>
                                <button class="btn btn-primary see-detail" data-id="${movie.imdbID}">
                                    See Detail
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            document.getElementById("movieList").innerHTML = output;

            // event tombol detail
            document.querySelectorAll(".see-detail").forEach(btn => {
                btn.addEventListener("click", function() {
                    showDetail(this.dataset.id);
                });
            });
        });
}

// function detail
function showDetail(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        .then(response => response.json())
        .then(movie => {

            const detail = `
                <div class="modal-header">
                    <h5 class="modal-title">${movie.Title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
                                <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                                <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                                <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                                <li class="list-group-item"><strong>Plot:</strong> ${movie.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("modalDetail").innerHTML = detail;

            const modal = new bootstrap.Modal(document.getElementById("movieModal"));
            modal.show();
        });
}