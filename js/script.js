$(document).ready(() => {
  // hide the loading screen and show the home page
  setTimeout(() => {
    $(".loadingScreen").fadeOut();
    $(".homeScreen").fadeIn("slow", () => {
      //when first screen is displayed
      // any code write here:
      var started = false;
      var sound = document.getElementById("sound");
      var soundPlaying = false;
      var pauseButton = document.getElementById("pause");
      var playButton = document.getElementById("play");

      let takeOffBtn = $("#takeOffBtn");
      takeOffBtn.on("click", () => {
        $(".takeoffclass").fadeOut();
        sound.play();
        soundPlaying = true;
        started = true;
      });

      var playSound = function(){
        sound.play();
        playButton.style.display = "none";
        pauseButton.style.display = "block"
        soundPlaying = true;
      }

      var pauseSound = function(){
        sound.pause();
        soundPlaying = false;
        pauseButton.style.display = "none"
        playButton.style.display = "block";
      }

      pauseButton.addEventListener("click", function(e){
       pauseSound();
      });

      playButton.addEventListener("click", function(e){
        playSound();
      });

      //Prevent the user from using the keyboard to engage with the website except for the space bar to start/stop the music

      window.addEventListener("keydown", function(e) {
        // space, page up, page down and arrow keys:
        if([33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if([32].indexOf(e.keyCode) > -1) {
          e.preventDefault();
          if(soundPlaying && started){
            pauseSound();
          }else if(!soundPlaying && started){ 
            playSound();
          }
      }
      }, false);
      
      window.addEventListener("wheel", e => e.preventDefault(), { passive:false });

      //audio

      var audio = document.getElementById("sound");
      var slow = document.querySelectorAll(".slow");

      var updatePosition = function(){
        if(audio.currentTime>30.0 && soundPlaying){
            slow.forEach(obj => {
              var position = obj.getBoundingClientRect();
              obj.style.left = position.left - 1 + 'px';
              // obj.style.top = ;
            });
      }
    }
      setInterval(updatePosition, 10);

      var plane = document.getElementById("plane");
      var planeAltitude = $(window).innerHeight() / 2;
      var middlesection = $(".homeScreen").innerWidth() * 0.3;
      var bottom = 0;
      var isUp = false;

      var slideIn = setInterval(() => {
        if(started){
          plane.style.left = plane.getBoundingClientRect().left + 2 + 'px';
          bottom = bottom + 0.1;
          plane.style.bottom = bottom + "%";
          if(plane.getBoundingClientRect().left>=0){
            clearInterval(slideIn);
            isUp = true;
          }
        }
      }, 15);

      // var takeOff = setInterval(() => {
      //   if(isUp){
      //     plane.style.left = plane.getBoundingClientRect().left + 2 + 'px';
      //     bottom = bottom + 0.5;
      //     plane.style.bottom = bottom + "px";
      //     if(plane.getBoundingClientRect().left>=0){
      //       clearInterval(takeOff);
      //     }
      //   }
      // }, 15);

      


      

    });
  }, 0);
});
