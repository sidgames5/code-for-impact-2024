var map = L.map('map').setView([40.4406, -79.9959], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function addMarker(lat, lon, popupContent) {
    L.marker([lat, lon]).addTo(map)
        .bindPopup(popupContent);
}

fetch('http://ip-api.com/json', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.text())
    .then(data => {
        var lat = JSON.parse(data).lat;
        var lon = JSON.parse(data).lon;
        map.setView([lat, lon], 10);
    })
    .catch(error => {
        console.error('Error:', error);
    });

fetch('/api/places', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.text())
    .then(data => {
        JSON.parse(data).forEach(place => {
            var marker = L.marker([place.lat, place.long]).addTo(map);
            marker.on('click', function (e) {
                openModal(place.crc32);
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

// function closeModal() {
//     var modal = document.getElementById("modal");
//     modal.style.display = "none";
// }

function openModal(id) {
    var modal = document.getElementById("modal");
    var iframe = document.getElementById("modal-iframe");
    iframe.setAttribute("src", "/modal.html?id=" + id);
    modal.style.display = "block";
}

// document.getElementById("modal-close").onclick = closeModal();
document.getElementById("modal-iframe").addEventListener("load", function () {
    this.contentWindow.document.getElementById("close").onclick = function () {
        var modal = document.getElementById("modal");
        modal.style.display = "none";

    }
})