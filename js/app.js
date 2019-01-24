/*Declaring and assigning variables for operations*/

let list = document.getElementsByClassName("card");
let deck = document.getElementById("deckofcards");

/*Assigning a array for storing the type of opened card*/
let open = [];
/*Initial assigning moves and matches to be zero*/
let moves = 0;
let matches = 0;

var duration;
/*Updating the number of moves*/
let count = document.querySelector(".moves");
/*Declaring the score-card to show after finishing game*/

let scorecard = document.getElementsByClassName("scorecard");
let layout = document.getElementById("layout");

/*Initial declaring stars and timer*/

let stars = 3;
/*Initailisng the query timer to variable timer*/
var timer = document.querySelector(".timer");

/*Initial calling to startgame*/

startgame();

function shuffle() {

    /*The shuffling function for shuffling cards*/

    $(document).ready(function () {
        $('.deck').each(function () {
            var $ul = $(this);
            var $liArr = $ul.children('.card');
            $liArr.sort(function (a, b) {
                    var temp = parseInt(Math.random() * 10);
                    var isOddOrEven = temp % 2;
                    var isPosOrNeg = temp > 5 ? 1 : -1;
                    return (isOddOrEven * isPosOrNeg);
                })
                .appendTo($ul);
        });
    });
};

function remove() {

    /*To remove the cards after restarting the game*/

    let cardsshuffle = [...list];
    for (var i = 0; i < cardsshuffle.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cardsshuffle, function (item) {
            deck.appendChild(item);
        });
        cardsshuffle[i].classList.remove("show", "open", "match", "disabled");
    }
};


function restart() {

    /*The restart function used to restart the game*/

    remove();
    shuffle();
    resettimer();
    resetcounter();
};

function startgame() {

    /*Initial shuffling*/ 

    shuffle();
    var showcard = function () {
        $(".deck .card").click(function () {
            $(this).addClass("open show disabled")
            open.push(this);
            var size = open.length;
            console.log(open)
            if (size === 2) {
                if (open[0].type === open[1].type) {
                    same();
                    matching();
                } else {
                    notsame();
                }

            } else if (size === 1) {
                console.log(open[0]);
                startcounter();
            }
        })

    }

    /*Calling to display cards*/

    showcard();


};


function same() {

    /*Performs matching for same cards*/

    open[0].classList.add("match", "disabled");
    open[1].classList.add("match", "disabled");
    open[0].classList.remove("show", "open");
    open[1].classList.remove("show", "open");
    open = [];
};


function notsame() {

    /*In the unmatched cases*/

    open[0].classList.add("not");
    open[1].classList.add("not");
    setTimeout(function () {

        /*using timeout for delaying the unmatched case*/

        open[0].classList.remove("show", "open", "disabled", "not");
        open[1].classList.remove("show", "open", "disabled", "not");
        open = [];
    }, 200);


};

function starttimer() {

    /*Initial starting of timer*/

    var seconds = 0,
        minutes = 0;
    duration = setInterval(function () {
        timer.innerHTML = minutes + "mins " + seconds + "secs";
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);

};

function resettimer() {

    /*Reset the timer during restart*/

    seconds = 0;
    minutes = 0;
    /*Updating the query timer*/
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(duration);

};

function startcounter() {

    /*Star rating based on moves*/

    moves++;
    if (moves == 1) {
        /*Initial starting of timer*/
        starttimer();

    }
    count.innerHTML = moves;

   /* Rating decrease on increase in moves*/
    /*Updating the star rating*/

    if (moves == 15) {
        $('.fa-star').last().attr('class', "fa fa-star-o");
        stars--;
    } else if (moves == 20) {
        $('.fa-star').last().attr('class', "fa fa-star-o");
        stars--;
    } else if (moves == 25) {
        $('.fa-star').last().attr('class', "fa fa-star-o");
        stars--;
    }
};

function resetcounter() {

    /*Re-setting the counter*/
    open=[];
    matches=0;
    moves = 0;
    count.innerHTML = moves;
    /*Updating the counter,star rating*/
    $('.fa-star-o').last().attr('class', "fa fa-star");
    $('.fa-star-o').last().attr('class', "fa fa-star");
    $('.fa-star-o').last().attr('class', "fa fa-star");
    stars = 3;
};

function matching() {

    /*Matching functionality*/

    matches++;
    if (matches == 8) {
        /*Display Pop-up after completing game*/
        var time = timer.innerHTML;
        swal({
            title: "CONGRATULATIONS YOU DID IT",
            text: `THE MOVES ARE:${moves}.THE TIME IS:${time}.THE STAR RATING IS:${stars}`,
            icon: "success",
            button: {
                text: "Play Again"
            }
        });
        $('.swal-button').click(function () {
            $(restart);
        })
        matches=0;
        clearInterval(duration);

    }
}