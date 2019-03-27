
var states = {
    WAGERING: 1,
    DEALING: 2,
    PLAYER_TURN: 3,
    DEALER_TURN: 4,
    LOSS: 5,
    PUSH: 6,
    WIN: 7,
    EXIT: 8
};

class BlacKJack{
    constructor(userid){
        this.state = states.WAGERING;
        this.wager = 0;
        this.player_hand = [];
        this.dealer_hand = [];
        this.deck = new Deck();
        this.deck.shuffle();
    }
}

let blackjackGames = [];

exports.blackJack = function(userid){
    blackjackGames.push({userid: userid, game: new BlackJack()})
}