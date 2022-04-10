$(document).ready(() => {
  // hide the loading screen and show the home page
  setTimeout(() => {
    $(".loadingScreen").fadeOut();
    $(".homeScreen").fadeIn("slow", () => {
      //when first screen is displayed
      // any code write here:
      window.addEventListener("keydown", function(e) {
        // space, page up, page down and arrow keys:
        if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
      }, false);
      
      window.addEventListener("wheel", e => e.preventDefault(), { passive:false });

      var audio = document.getElementById("sound");
      var slow = document.querySelectorAll(".slow");
      
      
      sound.addEventListener("timeupdate", function(event){
        //get time stamp of the sound
        if(audio.currentTime<3.0){
          // slow.forEach(obj => {
          //   obj.style.left = ;
          //   obj.style.left = ;
          // });
          //figure out how to do thiss
        }
      });



    });
  }, 0);
});
