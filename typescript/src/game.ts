export class Game {

    private players: Array<Player> = [];
    private currentPlayerIndex: number = 0;
    private currentPlayer: Player;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
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
            if (roll % 2 != 0) {
                this.gettingOutOfPenaltyBox();

                console.log(this.currentPlayer.name + " is getting out of the penalty box");
                this.currentPlayer.addToPlace(roll)
                if (this.currentPlayer.isPlaceBiggerThan11()) {
                    this.currentPlayer.resetPlace()
                }

                console.log(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
                console.log("The category is " + this.currentCategory());
                this.askQuestion();
            } else {
                console.log(this.currentPlayer.name + " is not getting out of the penalty box");
                this.notGettingOutOfPenaltyBox();
            }
        } else {
            this.currentPlayer.addToPlace(roll)
            if (this.currentPlayer.isPlaceBiggerThan11()) {
                this.currentPlayer.resetPlace()
            }

            console.log(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
            console.log("The category is " + this.currentCategory());
            this.askQuestion();
        }
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
        if (this.currentCategory() == 'Pop') {
            let message = this.popQuestions.shift();
            this.showQuestion(message);
        }
        if (this.currentCategory() == 'Science') {
            let message = this.scienceQuestions.shift();
            this.showQuestion(message);
        }
        if (this.currentCategory() == 'Sports') {
            let message = this.sportsQuestions.shift();
            this.showQuestion(message);
        }
        if (this.currentCategory() == 'Rock') {
            let message = this.rockQuestions.shift();
            this.showQuestion(message);
        }
    }

    private currentCategory(): string {
        if (this.currentPlayer.place == 0)
            return 'Pop';
        if (this.currentPlayer.place == 4)
            return 'Pop';
        if (this.currentPlayer.place == 8)
            return 'Pop';
        if (this.currentPlayer.place == 1)
            return 'Science';
        if (this.currentPlayer.place == 5)
            return 'Science';
        if (this.currentPlayer.place == 9)
            return 'Science';
        if (this.currentPlayer.place == 2)
            return 'Sports';
        if (this.currentPlayer.place == 6)
            return 'Sports';
        if (this.currentPlayer.place == 10)
            return 'Sports';
        return 'Rock';
    }

    private correctAnswer() {
        console.log("Answer was correct!!!!");
        this.currentPlayer.increasePurse();
        console.log(this.currentPlayer.name + " now has " + this.currentPlayer.purse + " Gold Coins.");

        return this.currentPlayer.didWin();
    }

    private notGettingOutOfPenaltyBox() {
        this.isGettingOutOfPenaltyBox = false;
    }

    private gettingOutOfPenaltyBox() {
        this.isGettingOutOfPenaltyBox = true;
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
}