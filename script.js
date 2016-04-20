/**
 * Created by Timmy on 1/28/2016.
 */
//global variables for card-clicked
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
//global variables for stats
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var oops = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Oops_03.mp3");
var well_played = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Well Played_02.mp3");
var error = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_ERROR10_30.mp3");
var start = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Start_09.mp3");
var complete = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Concede_07.mp3");

function card_clicked(clicked) {
    if (first_card_clicked == null) {
        clicked.toggle();
        first_card_clicked = clicked;

    }
    else if (second_card_clicked == null) {
        clicked.toggle();
        second_card_clicked = clicked;
        ++attempts;
        if (first_card_clicked.parent().find('.front > img').attr('src') == second_card_clicked.parent().find('.front > img').attr('src')) {
            matched();
            if (match_counter == total_possible_matches) {
                $('.card').hide();
                $('#winner').text("You have won!").css('font-size', '50px', 'margin-top', '20px');
                complete.play();
            }
        }
        else {
            setTimeout("flip_down()", 2000);
            oops.play();
        }
    }
    else {
        $(clicked).effect('shake');
        error.play();
    }
}
//dan start
//define function to flip the cards down

    //toggle the first card clicked

    //toggle the second card clicked

    //set the first card clicked to null

    //set the second card clicked to null

    //assign a new accuracy by dividing the number of matches by the number of attempts

    //display the stats to the user


//define function to execute what happens when two cards are matched

    //increase the match counter by 1

    //set the first card clicked to null

    //set the second card clicked to null

    //assign a new accuracy by dividing the number of matches by the number of attempts

    //display the stats to the user

    //play a sound that represents the user has won


//define function to display the user's stats

    //show the amount of games the user has played

    //show the amount of attempts the user has made

    //show the user's accuracy


// define function to reset the stats of the player

    //set the number of matches to 0

    //set the accuracy to 0

    //set the number of attempts to 0

    //set the first card clicked to null

    //set the second card clicked to null

    //display the stats to the user

    //play a sound that represents a game has started


// dan end
$(document).ready(function () {
    reset_stats();
    start.play();
    $('.card').on('click', '.back', function () {
            card_clicked($(this));
    });
    $('button').on('click', function () {
        ++games_played;
        reset_stats();
        $('.card').show();
        $('.back').show();
        $('#winner').text("");
    });
});
