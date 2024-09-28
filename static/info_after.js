loops = document.getElementsByClassName("placecard");
for (const elem of loops) {
    console.log("iter");
    if (elem.id == window.location.href.split("#")[1]) {
        elem.style.display = "block";
    }
}