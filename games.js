var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = []
var userClickedPattern = []

var started = false

var level = 0

$(document).keypress(function() {
    if (!started) {
        $('#title-level').text('Level ' + level)
        nextSequence()
        started = true
    }
})

$('.btn').click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length -1)
})

function checkAnswer(lastColor) {
    if (userClickedPattern[lastColor] === gamePattern[lastColor]){
        console.log('Success')

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout (function () {
                nextSequence()}, 1000)
        }
    }
    else {
        console.log('wrong')
         
        var wrong = new Audio('sounds/wrong.mp3')
        wrong.play()
        $('body').addClass('game-over')

        setTimeout (function () {
            $('body').removeClass('game-over')
        }, 200)

        $('#level-title').text('Game Over, Press Any Key to Restart')

        startOver()
    }
}

function nextSequence() {

    userClickedPattern = []

    level++
    
    $('#level-title').text('Level ' + level)

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber * 4);
    var randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound(randomChosenColor)
}

function playSound(name) {
    var sound = new Audio(`sounds/${name}.mp3`)
    sound.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed') 
    
        setTimeout(function() {
            $('#' + currentColor).removeClass('pressed')
        }, 100)
    }

function startOver() {
    level = 0
    gamePattern = []
    started = false
}
