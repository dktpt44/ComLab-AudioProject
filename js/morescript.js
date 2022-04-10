
$(document).ready(() => {
  // hide the loading screen and show the home page

  var sound = document.getElementById("sound");
  let takeOffBtn = $("#takeOffBtn");
  takeOffBtn.on("click", () => {
    $(".takeoffclass").fadeOut();
    sound.play();

  });
});
