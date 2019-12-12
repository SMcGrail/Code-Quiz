const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore; //pulls the final time from the quiz page and displays here.

//function to enable button once username field has input
username.addEventListener("keyup", () => {
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

//prevents the Save button from opening a new page
saveHighscore = (e) => {
    e.preventDefault();
};

