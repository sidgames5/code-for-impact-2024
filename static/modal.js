function genRevHtml(author, rating, text, ts) {
    var stars = '';
    for (let i = 0; i < rating; i++) {
        stars += '<i class="fa-solid fa-star"></i>';
    }
    while (stars.length < 32 * 5) {
        stars += '<i class="fa-regular fa-star"></i>';
    }
    return `<li>${stars} ${text} - ${author} <small>Submitted on ${ts}</small></li><br>`;
}

function isInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

var placeid = 0;

document.getElementById("reviewb").onclick = () => {
    while (true) {
        var text = prompt("Enter your review");
        if (text != "") {
            break;
        } else {
            alert("Please provide a valid review!")
        }
    }
    if (text == null) return;
    while (true) {
        var review = prompt("Enter your rating from 0 to 5");
        if (["0", "1", "2", "3", "4", "5"].includes(review)) {
            break;
        } else {
            alert("Please provide a valid rating from 0 to 5!")
        }
    }
    if (review == null) return;
    const author = prompt("Enter your name (Blank for anonymous)");

    fetch('/api/writereview', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: review,
            review: text,
            name: author,
            place: placeid
        })
    })
        .then(response => response.text())
        .then(data => {


            window.location.reload();

        })
        .catch(error => {
            alert("There was an error in saving your review: " + error);
        });
};

if (!isInIframe()) {
    // document.getElementById("close").style.display = "none";
    document.getElementById("close").onclick = function () {
        window.history.back();
    }
}

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
                placeid = place.crc32;
                var name = document.getElementById("name");
                var image = document.getElementById("image");
                var description = document.getElementById("description");

                name.innerHTML = place.name;
                document.title = place.name + " - Spotlight Explorer";
                image.setAttribute("src", place.imageURL);
                description.innerHTML = place.description;

                var list = document.getElementById("revslist");
                place.reviews.forEach(review => {
                    var dt = new Date(review.timestamp * 1000)
                    list.innerHTML += genRevHtml(review.name, review.rating, review.review, dt.toLocaleDateString());
                });
                if (place.reviews.length < 1) {
                    list.innerHTML += "<li>No reviews yet</li>";
                }

            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });








