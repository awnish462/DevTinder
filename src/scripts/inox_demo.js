function onBookClick() {
  document.getElementById("displaycontent").style.display = "block";
  document.getElementById("btnBook").innerHTML = "Book";
  document.getElementById("lablmovie").innerHTML =
    document.getElementById("movie").value;
  document.getElementById("labldate").innerHTML =
    document.getElementById("date").value;
  document.getElementById("labltime").innerHTML =
    document.getElementById("time").value;
  document.getElementById("lablcinema").innerHTML =
    document.getElementById("cinema").value;
}

function onEditClick() {
  document.getElementById("btnBook").innerHTML = "Save";
}
