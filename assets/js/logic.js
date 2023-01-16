// Declare necessary variables that are linked to the HTML
const timer = document.querySelector("#time");
const startButton = document.querySelector("#start");
const introDiv = document.querySelector("#start-screen");
const questionDiv = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choices");
const feedbackDiv = document.querySelector("#feedback");
const correctAudio = new Audio('assets/sfx/correct.wav');
const incorrectAudio = new Audio('assets/sfx/incorrect.wav');
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const userInitials = document.querySelector("#initials");
const scoreSubmitButton = document.querySelector("#submit");
const scoreText = document.querySelector("#score-text");

// Declare game mechanic constants that can be changed easily
const timeLeftOption = questions.length * 10;
const timePenalty = 5;

// Declare variables
var timeLeft = timeLeftOption; // Allows time to be reset to game specified number
var activeQuestion = [];
var feedbackText = document.createElement('p');
feedbackText.setAttribute("class", "feedback");

var endGame = false;
var userScore = '';

// Add event listener for Start button
startButton.addEventListener("click", function() {
  console.log("Start Button has been clicked");
  introDiv.setAttribute("class", "hide");
  questionDiv.setAttribute("class", "start");
  timeLeft = timeLeftOption;
  gameTimer();
  randomQuestion();

  printQuestion();
  console.log(activeQuestion);

});

// Timer function for the game
function gameTimer() {
    var timerInterval = setInterval(function() {
        timer.textContent = timeLeft;
  
      if(timeLeft <= 0) {
        // Stops execution of action at set interval
        showEnd();
        clearInterval(timerInterval);
        timeLeft = timeLeftOption;

      } else if (endGame === true) {
        showEnd();
        clearInterval(timerInterval);
        timeLeft = timeLeftOption;
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
  activeQuestion = Object.entries(questions[index]);

  // Remove chosen question from array so that it can't show again
  questions.splice(index, 1);
};

// Print first question and multiple choice answers function
function printQuestion() {
  // Add question text to H2
  questionTitle.textContent = activeQuestion[0][1];

  // Print answer choices. i must start with array '1' where the choices begin
  for (var i = 1; i < activeQuestion.length; i++) {
    // Add a button per answer
    choiceButton = document.createElement('button');

    if(activeQuestion[i][0] === "correctAnswer") {
      choiceButton.setAttribute("data-set", "correct");

    } else {
      choiceButton.setAttribute("data-set", "wrong");

    };

    choiceButton.setAttribute("class", "answerButton");
    document.body.children[2].children[1].children[1].appendChild(choiceButton);
    choiceButton.textContent = i + ". " + activeQuestion[i][1];
  };
};

// Event listener for correct or incorrect answer
document.querySelector(".choices").addEventListener("click", function(event) {
  var element = event.target;

  // Get data-attribute of a button
  if (element.matches("button")) {

    // Variable to store the data-set value
    var state = element.getAttribute("data-set");

    if(questions.length == '') {
      showEnd();

    } else if(state === "wrong") {

      // Check data-set state for wrong or correct
      playAudio(incorrectAudio);
      timeLeft -= timePenalty;
      feedback();
      feedbackText.textContent = "Wrong!";
      randomQuestion();
      nextQuestion();

    } else {
      playAudio(correctAudio);
      feedback();
      feedbackText.textContent = "Correct!";
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
    b[i-1].innerHTML = i + ". " + activeQuestion[i][1];
    console.log(b);

    // If statement updates data-attribute based on correctAnswer array being true
    if (activeQuestion[i][0] === "correctAnswer") {
      b[i-1].setAttribute("data-set", "correct");

    } else {
      b[i-1].setAttribute("data-set", "wrong");

    };
  };
};

// Function to append feedback response
function feedback() {
  document.body.children[2].children[1].children[2].appendChild(feedbackText);
};

// Function to play audio files
function playAudio(x) {
  x.play();
};

// Function to show end-screen
function showEnd() {
  // Condition if time has run out
  if (timeLeft <= 0) {
    scoreText.textContent = "Oh No! You ran out of time";
    userScore = timeLeft;

  // Condition if user has completed all questions before time runs out
  } else {
    finalScore.textContent = timeLeft;
    userScore = parseInt(timeLeft);

  };
  questionDiv.setAttribute("class", "hide");
  endScreen.setAttribute("class", "start");
  timer.textContent = "Game Over";
  endGame = true;
};

// Save users name and score function
scoreSubmitButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  // create user object from submission
  var user = {
    initials: userInitials.value.trim(),
    score: userScore
  };
  
  // validate the fields
  if (user.initials === "") {
    alert("Error", "Initials can't be blank");

  } else {
    alert("Success", "Score saved successfully");

    // Save Score
    localStorage.setItem(user.initials, user.score);
    endScreen.setAttribute("class", "hide");
    introDiv.setAttribute("class", "start");
  }
});