const highscoresOL = document.querySelector("#highscores");
const clearButton = document.querySelector("#clear");

var scores = localStorage;
scores = Object.keys(scores).map((key) => [(key), scores[key]]);

// Remove the debug that keeps appearing
for (var i = 0; i < scores.length; i++) {
    if(scores[i][0] === "debug") {
        scores.splice(i, 1)
    }
}

scores = scores.sort(function(a, b) {
    return b[1] - a[1];
  });

console.table(scores)

for (var i = 0; i < scores.length; i++) {
    scoreList = document.createElement('li');
    scoreList.setAttribute("class", "score-list")

    document.body.children[0].children[1].appendChild(scoreList);
    scoreList.textContent = scores[i][0] + " with " + scores[i][1]
}

clearButton.addEventListener("click", function() {
    localStorage.clear();
    highscoresOL.innerHTML = '';

});