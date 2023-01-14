// Declare necessary variables that are linked to the HTML

const timer = document.querySelector("#time");
const startButton = document.querySelector("#start");
const introDiv = document.querySelector("#start-screen");
const questionDiv = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");
const feedbackDiv = document.querySelector("#feedback");

// Declare constants

const timeLeftOption = 5;
const timePenalty = 5;

// Declare variables

var timeLeft = timeLeftOption; // Allows time to be reset to game specified number
var activeQuestion = [];
var feedbackText = document.createElement('p');
feedbackText.setAttribute("class", "feedback")


// Add event listener for Start button

startButton.addEventListener("click", function() {
  console.log("Start Button has been clicked");
  introDiv.setAttribute("class", "hide")
  questionDiv.setAttribute("class", "start")
  timeLeft = timeLeftOption
  randomQuestion();
  gameTimer();
  printQuestion();
  console.log(activeQuestion);

});

// Timer function for the game

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

// Random question picker function
function randomQuestion() {

  // Get random array number
  let index = Math.floor(Math.random() * questions.length);
  
  // Convert object to array for later looping
  activeQuestion = Object.entries(questions[index])

  // Remove chosen question from array so that it can't show again
  questions.splice(index, 1);

  console.log(questions);

};

// Print first question and multiple choice answers function
function printQuestion() {

  // Add question text to H2
  questionTitle.textContent = activeQuestion[0][1];

  // Print answer choices. i must start with array '1' where the choices begin
  for (var i = 1; i < activeQuestion.length; i++) {
    // Add a button per answer
    choiceButton = document.createElement('button');
    choiceButton.setAttribute("data-set", "wrong")
    document.body.children[2].children[1].children[1].appendChild(choiceButton);
    choiceButton.textContent = activeQuestion[i][1];

    // Set a dataset to identify the correct answer. Array 4 is always the correct answer
    if(i == 4){
      choiceButton.setAttribute("data-set", "correct")

    };
  };

};

// Event listener for correct or incorrect answer
document.querySelector(".choices").addEventListener("click", function(event) {
  
  var element = event.target;

  // Get data-attribute of a button
  if (element.matches("button")) {

    // Variable to store the data-set value
    var state = element.getAttribute("data-set");

    // Check data-set state for wrong or correct
    if(state === "wrong") {

      document.body.children[2].children[1].children[2].appendChild(feedbackText)
      feedbackText.textContent = "Wrong!"
      console.log("Wrong answer");
      randomQuestion();
      printQuestion();

    } else {
      feedbackText.setAttribute("class", "feedback")
      document.body.children[2].children[1].children[2].appendChild(feedbackText)
      feedbackText.textContent = "Correct!"
      console.log("Correct answer");
      randomQuestion();
      printQuestion();
    };
  };
});