// Declare necessary variables that are linked to the HTML

const timer = document.querySelector("#time");
const startButton = document.querySelector("#start");
const introDiv = document.querySelector("#start-screen");


// Create a timer function for the game with a variable start time
const timeLeftOption = 5;
var timeLeft = timeLeftOption; // Allows time to be reset to game specified number

function gameTimer() {

    var timerInterval = setInterval(function() {
        timer.textContent = timeLeft;
        console.log(timeLeft); //debugging
  
      if(timeLeft === 0) {
        // Stops execution of action at set interval
        timer.textContent = "Time's Up";
        clearInterval(timerInterval);
        timeLeft = timeLeftOption

      };

      // Reduce Time By 1 Second
      timeLeft--;
  
    }, 1000);

  };

// Add event listener for Start button

startButton.addEventListener("click", function() {
    introDiv.setAttribute("class", "hide")
    timeLeft = timeLeftOption
    gameTimer();
    console.log("Start Button has been clicked");

});