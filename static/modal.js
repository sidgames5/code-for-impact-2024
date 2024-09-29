function genRevHtml(author, rating, text) {
    var stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '<i class="fa-solid fa-star"></i>';
    }
    while (stars.length < 32 * 5) {
        stars += '<i class="fa-regular fa-star"></i>';
    }
    return `<li>${stars} ${text} - ${author} <small>Submitted on </small></li><br>`;
}

document.getElementById("reviewb").onclick = () => { };

fetch('/api/places', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.text())
    .then(data => {
        var params = document.URL.split("?")[1].split("&");
        var id = 0;
        params.forEach(param => {
            var k = param.split("=")[0];
            if (k == "id") {
                id = param.split("=")[1];
            }
        });
        JSON.parse(data).forEach(place => {
            if (place.crc32 == id) {
                var name = document.getElementById("name");
                var image = document.getElementById("image");
                var description = document.getElementById("description");

                name.innerHTML = place.name;
                image.setAttribute("src", place.imageURL);
                description.innerHTML = place.description;

                fetch('/api/getreview?place=' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.text())
                    .then(reviews => {
                        var list = document.getElementById("revslist");
                        JSON.parse(reviews).forEach(review => {
                            list.innerHTML += genRevHtml(review.name, review.rating, review.review);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });








