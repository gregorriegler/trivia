export class Game {

    private players: Array<Player> = [];
    private currentPlayerIndex: number = 0;
    private currentPlayer: Player;
    private isGettingOutOfPenaltyBox: boolean = false;

    private questions = {
        "Pop": [],
        "Science": [],
        "Sports": [],
        "Rock": []
    };

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.questions.Pop.push("Pop Question " + i);
            this.questions.Science.push("Science Question " + i);
            this.questions.Sports.push("Sports Question " + i);
            this.questions.Rock.push("Rock Question " + i);
        }
    }

    public add(name: string): boolean {
        this.players.push(new Player(name))
        this.currentPlayer = this.players[0];

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    public roll(roll: number) {
        console.log(this.currentPlayer.name + " is the current player");
        console.log("They have rolled a " + roll);

        if (this.currentPlayer.inPenaltyBox) {
            if (this.isEven(roll)) {
                this.gettingOutOfPenaltyBox();
                this.playRound(roll);
            } else {
                this.notGettingOutOfPenaltyBox();
            }
        } else {
            this.playRound(roll);
        }
    }

    private isEven(roll: number) {
        return roll % 2 != 0;
    }

    private playRound(roll: number) {
        this.currentPlayer.addToPlace(roll)
        if (this.currentPlayer.isPlaceBiggerThan11()) {
            this.currentPlayer.resetPlace()
        }

        console.log(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
        console.log("The category is " + this.currentPlayer.category());
        this.askQuestion();
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.currentPlayer.name + " was sent to the penalty box");
        this.currentPlayer.putIntoPenaltyBox();

        this.rotatePlayer();
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        let winner = !this.currentPlayer.inPenaltyBox || this.isGettingOutOfPenaltyBox
            ? this.correctAnswer()
            : true;
        this.rotatePlayer();
        return winner;
    }

    private askQuestion(): void {
        this.showQuestion(this.questions[this.currentPlayer.category()].shift());
    }

    private correctAnswer() {
        console.log("Answer was correct!!!!");
        this.currentPlayer.increasePurse();
        console.log(this.currentPlayer.name + " now has " + this.currentPlayer.purse + " Gold Coins.");

        return this.currentPlayer.didWin();
    }

    private notGettingOutOfPenaltyBox() {
        this.isGettingOutOfPenaltyBox = false;
        console.log(this.currentPlayer.name + " is not getting out of the penalty box");
    }

    private gettingOutOfPenaltyBox() {
        this.isGettingOutOfPenaltyBox = true;
        console.log(this.currentPlayer.name + " is getting out of the penalty box");
    }

    private rotatePlayer() {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length)
            this.currentPlayerIndex = 0;

        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    private showQuestion(message) {
        console.log(message);
    }
}

class Player {
    private _name: string;
    private _place: number;
    private _purse: number;
    private _inPenaltyBox: boolean;

    constructor(name: string) {
        this._name = name;
        this._place = 0;
        this._purse = 0;
        this._inPenaltyBox = false;
    }

    get name(): string {
        return this._name;
    }

    get place(): number {
        return this._place;
    }

    get purse(): number {
        return this._purse;
    }

    get inPenaltyBox(): boolean {
        return this._inPenaltyBox;
    }

    putIntoPenaltyBox() {
        this._inPenaltyBox = true;
    }

    addToPlace(roll: number) {
        this._place += roll;
    }

    resetPlace() {
        this._place -= 12;
    }

    isPlaceBiggerThan11(): boolean {
        return this._place > 11;
    }

    increasePurse() {
        this._purse += 1;
    }

    didWin(): boolean {
        return this._purse != 6
    }

    category(): string {
        if (this._place == 0)
            return 'Pop';
        if (this._place == 4)
            return 'Pop';
        if (this._place == 8)
            return 'Pop';
        if (this._place == 1)
            return 'Science';
        if (this._place == 5)
            return 'Science';
        if (this._place == 9)
            return 'Science';
        if (this._place == 2)
            return 'Sports';
        if (this._place == 6)
            return 'Sports';
        if (this._place == 10)
            return 'Sports';
        return 'Rock';
    }
}