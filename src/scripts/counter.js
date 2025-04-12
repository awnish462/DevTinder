let x = 30;
var id;
function counter() {
  document.getElementById("counter").innerHTML=x--;
}

function startCounter() {
  id = setInterval(() => {
    counter();
  }, 1000);
}

function stopCounter() {
  clearInterval(id);
}
