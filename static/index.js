function makePopup(link, title) {
    window.location.href = link
}

fetch('/api/places', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(response => response.text())
    .then(data => {
        let c = 0;
        var list = document.getElementById("place-recs");
        JSON.parse(data).forEach(place => {
            c++;
            if (c == 10) return;
            list.innerHTML += "<li><a>" + place.name + "</a> <button class='dfdfd' crc32='" + place.crc32 + "'>Info</button></li><br>";
            console.log(place.crc32 + " button added")
        });
        document.querySelectorAll(".dfdfd").forEach(button => {
            button.addEventListener('click', function () {

                console.log(button.getAttribute("crc32"));
                window.location.href = ("/modal.html?id=" + button.getAttribute("crc32"));
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });