/**
 * Created by Timmy on 1/28/2016.
 */
//global variables for card-clicked
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
//global variables for stats
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var oops = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Oops_03.mp3");
var well_played = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Well Played_02.mp3");
var error = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_ERROR10_30.mp3");
var start = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Start_09.mp3");
var complete = new Audio("\/\/wow.zamimg.com\/hearthhead\/sounds\/VO_HERO_05_Concede_07.mp3");

//array of card objects
var cards = [
    {class: "hunter", card_front: "pictures/hunter.png", card_back: "pictures/cardback.png"},
    {class: "hunter", card_front: "pictures/hunterhp.png", card_back: "pictures/cardback.png"},
    {class: "mage", card_front: "pictures/mage.png", card_back: "pictures/cardback.png"},
    {class: "mage", card_front: "pictures/magehp.png", card_back: "pictures/cardback.png"},
    {class: "druid", card_front: "pictures/druid.png", card_back: "pictures/cardback.png"},
    {class: "druid", card_front: "pictures/druidhp.png", card_back: "pictures/cardback.png"},
    {class: "shaman", card_front: "pictures/shaman.png", card_back: "pictures/cardback.png"},
    {class: "shaman", card_front: "pictures/shamanhp.png", card_back: "pictures/cardback.png"},
    {class: "warrior", card_front: "pictures/warrior.png", card_back: "pictures/cardback.png"},
    {class: "warrior", card_front: "pictures/warriorhp.png", card_back: "pictures/cardback.png"},
    {class: "priest", card_front: "pictures/priest.png", card_back: "pictures/cardback.png"},
    {class: "priest", card_front: "pictures/priesthp.png", card_back: "pictures/cardback.png"},
    {class: "rogue", card_front: "pictures/rogue.png", card_back: "pictures/cardback.png"},
    {class: "rogue", card_front: "pictures/roguehp.png", card_back: "pictures/cardback.png"},
    {class: "paladin", card_front: "pictures/paladin.png", card_back: "pictures/cardback.png"},
    {class: "paladin", card_front: "pictures/paladinhp.png", card_back: "pictures/cardback.png"},
    {class: "warlock", card_front: "pictures/warlock.png", card_back: "pictures/cardback.png"},
    {class: "warlock", card_front: "pictures/warlockhp.png", card_back: "pictures/cardback.png"},
];

function board_init() {
    for(var i = 0; i < cards.length; i++) {
        var card = $('<div>', {
            class: 'card'
        });
        var front = $('<img>', {
            src: cards[i].card_front,
            class: 'front'
        });
        var back = $('<img>', {
            src: cards[i].card_back,
            class: 'back'
        });
        $(card).append(front, back);
        console.log(card);
        $("#game-area").append(card);
    }
}

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
function flip_down() {
    first_card_clicked.toggle();
    second_card_clicked.toggle();
    first_card_clicked = null;
    second_card_clicked = null;
    accuracy = (matches / attempts) * 100 + "%";
    display_stats();
}

function matched() {
    ++match_counter;
    ++matches;
    first_card_clicked = null;
    second_card_clicked = null;
    accuracy = (matches / attempts) * 100 + "%";
    display_stats();
    well_played.play();
}

function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
}

function reset_stats() {
    match_counter = 0;
    accuracy = 0;
    matches = 0;
    attempts = 0;
    first_card_clicked = null;
    second_card_clicked = null;
    display_stats();
    start.play();
}

$(document).ready(function () {
    reset_stats();
    board_init();
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
