export class Game {

    private players: Array<Player> = [];
    private currentPlayer: number = 0;
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

        console.log(name + " was added");
        console.log("They are player number " + this.players.length);

        return true;
    }

    public roll(roll: number) {
        console.log(this.currentPlayerName() + " is the current player");
        console.log("They have rolled a " + roll);

        if (this.currentPlayerInPenaltyBox()) {
            if (roll % 2 != 0) {
                this.gettingOutOfPenaltyBox();

                console.log(this.currentPlayerName() + " is getting out of the penalty box");
                this.addToCurrentPlayerPlace(roll);
                if (this.getCurrentPlayer().isPlaceBiggerThan11()) {
                    this.resetCurrentPlayerPlace();
                }

                console.log(this.currentPlayerName() + "'s new location is " + this.currentPlayerPlace());
                console.log("The category is " + this.currentCategory());
                this.askQuestion();
            } else {
                console.log(this.currentPlayerName() + " is not getting out of the penalty box");
                this.notGettingOutOfPenaltyBox();
            }
        } else {
            this.addToCurrentPlayerPlace(roll);
            if (this.getCurrentPlayer().isPlaceBiggerThan11()) {
                this.resetCurrentPlayerPlace();
            }

            console.log(this.currentPlayerName() + "'s new location is " + this.currentPlayerPlace());
            console.log("The category is " + this.currentCategory());
            this.askQuestion();
        }
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.currentPlayerName() + " was sent to the penalty box");
        this.getCurrentPlayer().putIntoPenaltyBox();

        this.rotatePlayer();
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        let winner = this.currentPlayerNotInPenaltyBox() || this.isGettingOutOfPenaltyBox
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
        if (this.currentPlayerPlace() == 0)
            return 'Pop';
        if (this.currentPlayerPlace() == 4)
            return 'Pop';
        if (this.currentPlayerPlace() == 8)
            return 'Pop';
        if (this.currentPlayerPlace() == 1)
            return 'Science';
        if (this.currentPlayerPlace() == 5)
            return 'Science';
        if (this.currentPlayerPlace() == 9)
            return 'Science';
        if (this.currentPlayerPlace() == 2)
            return 'Sports';
        if (this.currentPlayerPlace() == 6)
            return 'Sports';
        if (this.currentPlayerPlace() == 10)
            return 'Sports';
        return 'Rock';
    }

    private correctAnswer() {
        console.log("Answer was correct!!!!");
        this.players[this.currentPlayer].increasePurse();
        console.log(this.currentPlayerName() + " now has " + this.currentPlayerPurse() + " Gold Coins.");

        return this.getCurrentPlayer().didWin();
    }

    private rotatePlayer() {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
    }

    private notGettingOutOfPenaltyBox() {
        this.isGettingOutOfPenaltyBox = false;
    }

    private gettingOutOfPenaltyBox() {
        this.isGettingOutOfPenaltyBox = true;
    }

    private currentPlayerName() {
        return this.getCurrentPlayer().name;
    }

    private addToCurrentPlayerPlace(roll: number) {
        this.getCurrentPlayer().addToPlace(roll)
    }

    private resetCurrentPlayerPlace() {
        this.getCurrentPlayer().resetPlace()
    }

    private currentPlayerPlace() {
        return this.getCurrentPlayer().place;
    }

    private currentPlayerPurse() {
        return this.getCurrentPlayer().purse;
    }

    private currentPlayerNotInPenaltyBox() {
        return !this.getCurrentPlayer().inPenaltyBox;
    }

    private currentPlayerInPenaltyBox() {
        return this.getCurrentPlayer().inPenaltyBox;
    }

    private getCurrentPlayer() {
        return this.players[this.currentPlayer];
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