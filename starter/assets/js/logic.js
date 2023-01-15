// Declare necessary variables that are linked to the HTML

const timer = document.querySelector("#time");
const startButton = document.querySelector("#start");
const introDiv = document.querySelector("#start-screen");
const questionDiv = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");
const feedbackDiv = document.querySelector("#feedback");
const correctAudio = new Audio('./assets/sfx/correct.wav');
const incorrectAudio = new Audio('./assets/sfx/incorrect.wav');

// Declare constants

const timeLeftOption = 120;
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
    choiceButton.setAttribute("data-set", "wrong");
    choiceButton.setAttribute("class", "answerButton");
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
      playAudio(incorrectAudio);
      timeLeft -= timePenalty;
      feedback();
      feedbackText.textContent = "Wrong!"
      console.log("Wrong answer");
      randomQuestion();
      nextQuestion();

    } else {
      playAudio(correctAudio);
      feedback();
      feedbackText.textContent = "Correct!";
      console.log("Correct answer");
      randomQuestion();
      nextQuestion();
    };
  };

});

// Function to print any question after the first question is printed
function nextQuestion() {

  // Sets the title to the next question
  questionTitle.textContent = activeQuestion[0][1];

  // Loop to change existing button values and attributes
  for(var i = 1; i < activeQuestion.length; i++) {

    var b = document.getElementsByClassName('answerButton')
    b[i-1].innerHTML = activeQuestion[i][1];
    console.log(b);

    // If statement updates data-attribute based on correctAnswer array being true
    if (activeQuestion[i][0] === "correctAnswer") {
      b[i-1].setAttribute("data-set", "correct");

    } else {
      b[i-1].setAttribute("data-set", "wrong")

    };
  };

};

// Function to append feedback response
function feedback() {
  document.body.children[2].children[1].children[2].appendChild(feedbackText)
};

// Function to play audio files
function playAudio(x) {
  x.play();
};

