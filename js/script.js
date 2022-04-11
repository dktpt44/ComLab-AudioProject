$(document).ready(() => {
  // hide the loading screen and show the home page
  setTimeout(() => {
    $(".loadingScreen").fadeOut();
    $(".homeScreen").fadeIn("slow", () => {
      //when first screen is displayed
      // any code write here:

      var overlay = document.querySelector('.lastblackscreen');
      var overlay2 = document.querySelector('.lastlastblackscreen');
      var heartattack = document.querySelector('.heart-rate2');
    //  overlay.style.display = "none";

      var sound = document.getElementById("sound");
      var soundPlaying = false;
      var pauseButton = document.getElementById("pause");
      var playButton = document.getElementById("play");

      let takeOffBtn = $("#takeOffBtn");
      takeOffBtn.on("click", () => {
        $(".takeoffclass").fadeOut();
        sound.play();
        soundPlaying = true;
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

      window.addEventListener("keydown", function(e) {
        // space, page up, page down and arrow keys:
        if([33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if([32].indexOf(e.keyCode) > -1) {
          //block play before starting the audio (in the very beginning)
          e.preventDefault();
          if(soundPlaying){
            pauseSound();
          }else{
            playSound();
          }
      }
      }, false);

      window.addEventListener("wheel", e => e.preventDefault(), { passive:false });

      var audio = document.getElementById("sound");
      var slow = document.querySelectorAll(".slow");

      var updatePosition = function(){
        if(audio.currentTime<30.0 && soundPlaying){
            slow.forEach(obj => {
              var position = obj.getBoundingClientRect();
              obj.style.left = position.left - 1 + 'px';
              // obj.style.top = ;
            });
      }

       if(audio.currentTime>180&& soundPlaying){
           overlay.style.opacity = "100%";
     }
     if(audio.currentTime>183 && soundPlaying){
         overlay2.style.opacity = "100%";
   }
   if(audio.currentTime>187 && soundPlaying){
       heartattack.style.display = "block";
 }
    }
      setInterval(updatePosition, 10);

    });
  }, 0);
});
