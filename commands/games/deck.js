class Deck {
    constructor(userid) {
        this.deck = [];
        this.reset();
    }

    reset() {
        this.deck = [];
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(`${values[value]} of ${suits[suit]}`);
            }
        }
    }

    shuffle() {
        const { deck } = this;
        let x = deck.length, i;
        while (x) {
            i = Math.floor(Math.random() * x--);
            [deck[x], deck[i]] = [deck[i], deck[x]]
        }
        return this;
    }

    deal() {
        return this.deck.pop();
    }

}

let cardDecks = [];

exports.newDeck = function(userid){
    cardDecks.push({userid: userid, deck: new Deck()})
}

exports.deal = function(userid){
    for(var i = 0; i < cardDecks.length; i++){
        if(carDecks[i].userid == userid){
            return carDecks[i].deck.deal();
        }
    }
}

exports.shuffle = function(deck){
    for(var i = 0; i < cardDecks.length; i++){
        if(carDecks[i].userid == userid){
            return carDecks[i].deck.shuffle();
        }
    }
}