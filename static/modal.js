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
            }
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });