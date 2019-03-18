class Deck{
    constructor(){
        this.deck = [];
        this.reset();
    }
    reset(){
        this.deck = [];
        const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let suit in suits){
        for (let value in values){
            this.deck.push(`${values[value]} of ${suits[suit]}`);
        }
    }
}
shuffle(){
    const{deck} = this;
    let x = deck.length, i;
    while(x){
        i = Math.floor(Math.random() * x--);
        [deck[x], deck[i]] = [deck[i], deck[x]]
    }
    return this;
}

deal(){
    return this.deck.pop();
}

}