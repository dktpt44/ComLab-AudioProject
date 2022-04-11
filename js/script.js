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
          }else if(!soundPlaying && planeUp){ 
            playSound();
          }
      }
      }, false);
      
      window.addEventListener("wheel", e => e.preventDefault(), { passive:false });

      //audio
      // getting the cloud and audio elements
      var audio = document.getElementById("sound");

      var slow = document.querySelectorAll(".slow");
      var fast = document.querySelector(".fast");
      var slower = document.querySelectorAll(".slower");
      var slowest = document.querySelectorAll(".slowest");

      var updatePosition = function(){
        // checking if sound is playing and move the clouds accordingly
        if(soundPlaying){
            slow.forEach(obj => {
              var position = obj.getBoundingClientRect();
              obj.style.left = position.left - 0.4 + 'px';

              if( position.left+position.width < 0) {
                // element is off to the left of the view
                console.log("left the screen");
            }
            });
            var pos = fast.getBoundingClientRect();
            fast.style.left = pos.left - ((0.0002)*(pos.left)) + 'px';
            slower.forEach(obj => {
              var position = obj.getBoundingClientRect();
              obj.style.left = position.left - 0.3 + 'px';
            });

            slowest.forEach(obj => {
              var position = obj.getBoundingClientRect();
              obj.style.left = position.left - 0.25 + 'px';
            });
      }
    }
      setInterval(updatePosition, 10);

      // manipulate the speed and direction of the plane
      var plane = document.getElementById("plane");
      var planeImage = document.getElementById("planeImage");
      var middlesection = $(".homeScreen").innerWidth() * 0.3;
      var planeBottom = 0;
      var planeLeft = -20;
      var planeUp = false;
      var angle = -21;
      var runway = document.getElementById("runway");
      var runwayBottom = 0;
      var runwayLeft = 0;

      // making the plane slide 
      var slideIn = setInterval(() => {
        if(started){
          planeBottom = planeBottom + 0.1;
          planeLeft = planeLeft + 0.1;
          plane.style.left = planeLeft + '%';
          plane.style.bottom = planeBottom + "%";
          if(plane.getBoundingClientRect().left>=0){
            clearInterval(slideIn);
            planeUp = true;
            playSound();
          }
        }
      }, 10);

      // making the plane take off and changing the heading angle
      var takeOff = setInterval(() =>{
        if(planeUp && soundPlaying){
          if(plane.getBoundingClientRect().left <= middlesection){
            angle = angle + 0.03;
            planeLeft = planeLeft + 0.07;
            planeBottom = planeBottom + 0.05;
            runwayBottom = runwayBottom - 0.15;
            runwayLeft = runwayLeft - 0.05;
            plane.style.left = planeLeft + '%';
            plane.style.bottom = planeBottom + "%";
            planeImage.style.transform = "rotate(" + angle + "deg)";
            runway.style.bottom = runwayBottom + "%";
            runway.style.left = runwayLeft + "%";
          }else{
            clearInterval(takeOff);
          }
        }
      }, 10);
      
      var goDown = setInterval(() =>{
        if(soundPlaying && sound.currentTime > 153.0){ //150.0
          angle = angle + 5;
          planeBottom = planeBottom - 0.02;
          plane.style.bottom = planeBottom + "%";
          planeImage.style.transform = "rotate(" + angle + "deg)";
        }
      }, 10);
    });
  }, 0);
});