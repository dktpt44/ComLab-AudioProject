window.addEventListener("keydown", function(e) {
  // space, page up, page down and arrow keys:
  if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);

window.addEventListener("wheel", e => e.preventDefault(), { passive:false })