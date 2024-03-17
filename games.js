var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(".btn").on("click", function () {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        console.log("wrong");
        var wrongAnswer = new Audio("sounds/wrong.mp3");
        wrongAnswer.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

// Function to increment visitors count for a specific user
function incrementVisitorsCount(userId) {
    let visitorsCount = localStorage.getItem(`visitorsCount_${userId}`);
    visitorsCount = visitorsCount ? parseInt(visitorsCount) : 0;
    visitorsCount++;
    // Store updated count value in localStorage for this user
    localStorage.setItem(`visitorsCount_${userId}`, visitorsCount);
    // Display the visitor count in the HTML
    $(".counts").text(`User ${userId} visited ${visitorsCount} times.`);
}

// Generate a unique user ID (if not already generated) and increment visitor count
window.onload = function () {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = Math.random().toString(36).substring(2, 9);
        localStorage.setItem('userId', userId);
    }
    incrementVisitorsCount(userId);
};
