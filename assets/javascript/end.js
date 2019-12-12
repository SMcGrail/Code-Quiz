const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

//NOTE: Things stored in local storage are stored as a string
//create an array of high scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore; //pulls the final time from the quiz page and displays here.

//function to enable button once username field has input
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

//prevents the Save button from opening a new page
saveHighscore = e => {
    e.preventDefault();

    //This will save the username and scores to an object
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    //this will push the object into the array
    highScores.push(score);

    //this will sort the highscores based on numerical value
    //NOTE: sort is a built in feature of Javascript
    highScores.sort( (a,b) => b.score - a.score)

    //This splice the lowest score from the array, so that we can only have the top 10 in this case
    highScores.splice(10);
    
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("highscores.html");
    console.log(highScores);
};


