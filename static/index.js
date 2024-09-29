function makePopup(link, title) {
    window.location.href = link
}

function isWithin100Miles(lat1, lon1, lat2, lon2) {
    const earthRadius = 3959;

    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance < 100;
}
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

fetch('/api/places', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.text())
    .then(data => {
        fetch('https://ipapi.co/json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.text())
            .then(d => {
                JSON.parse(data).forEach(place => {
                    let c = 0;
                    var list = document.getElementById("near-you");
                    var lat = JSON.parse(d).latitude;
                    var lon = JSON.parse(d).longitude;
                    if (isWithin100Miles(lat, lon, place.lat, place.long)) {
                        c++;
                        if (c == 10) return;
                        list.innerHTML += "<li><a>" + place.name + "</a> <button class='dfdfd' crc32='" + place.crc32 + "'>Info</button></li><br>";


                        document.querySelectorAll(".dfdfd").forEach(button => {
                            button.addEventListener('click', function () {
                                window.location.href = ("/modal.html?id=" + button.getAttribute("crc32"));
                            });
                        });
                    }

                })
                    .catch(error => {
                        console.error('Error:', error);
                    });



            });
    })
    .catch(error => {
        console.error('Error:', error);
    });