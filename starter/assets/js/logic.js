// Declare necessary variables that are linked to the HTML

var timer = document.querySelector("#time");



// Create a timer function for the game with a variable start time
var timeLeft = 5;

function setTime() {

    var timerInterval = setInterval(function() {
        timer.textContent = timeLeft;
  
      if(timeLeft === 0) {
        // Stops execution of action at set interval
        timer.textContent = "Time's Up";
        clearInterval(timerInterval);

      };

      // Reduce Time By 1 Second
      timeLeft--;
  
    }, 1000);

  };

