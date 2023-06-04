var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var toggle=false;
var level=0;


document.addEventListener("keydown",function(){
    if(toggle==false){
        toggle=true;
    $("#level-title").text("Level "+level);
        nextSequence();
    }
});

function nextSequence(){
    userClickedPattern=[];
    level=level+1;
    var randomNumber=Math.floor(Math.random() *4);
    var randomChosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    $("#level-title").text("Level "+(level));

}

function playSound(name){
    var audio= new Audio("sounds/" + name +".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");  
    }, 100);
}

$(".btn").click(function(){
    var userChoosenColour= $(this).attr('id');
    userClickedPattern.push(userChoosenColour);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});

 function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        //console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 800);
        }
    }
    else{
        //console.log("wrong");
        playSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        document.addEventListener("keypress",function(){
            startOver();
        });
    }
 }

 function startOver(){
    level=0;
    toggle=false;
    gamePattern=[];

 }