export class Game {

    private players: Array<Player> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
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
        let addedPlayer = this.players.length - 1;
        this.places[addedPlayer] = 0;
        this.purses[addedPlayer] = 0;

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
                this.places[this.currentPlayer] = this.currentPlayerPlace() + roll;
                if (this.currentPlayerPlace() > 11) {
                    this.places[this.currentPlayer] = this.currentPlayerPlace() - 12;
                }

                console.log(this.currentPlayerName() + "'s new location is " + this.currentPlayerPlace());
                console.log("The category is " + this.currentCategory());
                this.askQuestion();
            } else {
                console.log(this.currentPlayerName() + " is not getting out of the penalty box");
                this.notGettingOutOfPenaltyBox();
            }
        } else {
            this.places[this.currentPlayer] = this.currentPlayerPlace() + roll;
            if (this.currentPlayerPlace() > 11) {
                this.places[this.currentPlayer] = this.currentPlayerPlace() - 12;
            }

            console.log(this.currentPlayerName() + "'s new location is " + this.currentPlayerPlace());
            console.log("The category is " + this.currentCategory());
            this.askQuestion();
        }
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.currentPlayerName() + " was sent to the penalty box");
        this.putCurrentPlayerInPenaltxBox();

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
        this.purses[this.currentPlayer] += 1;
        console.log(this.currentPlayerName() + " now has " + this.currentPlayerPurse() + " Gold Coins.");

        return this.didPlayerWin();
    }

    private didPlayerWin(): boolean {
        return this.currentPlayerPurse() != 6
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
        return this.playerName(this.currentPlayer);
    }

    private playerName(index: number) {
        return this.players[index].getName();
    }
    private currentPlayerPlace() {
        return this.place(this.currentPlayer);
    }

    private place(index: number) {
        return this.places[index];
    }

    private currentPlayerPurse() {
        return this.purse(this.currentPlayer);
    }
    private purse(currentPlayer: number) {
        return this.purses[currentPlayer];
    }

    private currentPlayerNotInPenaltyBox() {
        return !this.currentPlayerInPenaltyBox();
    }

    private currentPlayerInPenaltyBox() {
        return this.isInPenaltyBox(this.currentPlayer);
    }

    private putCurrentPlayerInPenaltxBox() {
        this.players[this.currentPlayer].putIntoPenaltyBox();
    }
    private isInPenaltyBox(currentPlayer: number) {
        return this.players[currentPlayer].inPenaltyBox;
    }

    private showQuestion(message) {
        console.log(message);
    }
}

class Player {
    private name: string;
    private place: number;
    private purse: number;
    private _inPenaltyBox: boolean;

    constructor(name: string) {
        this.name = name;
        this.place = 0;
        this.purse = 0;
        this._inPenaltyBox = false;
    }

    public getName(): string {
        return this.name;
    }


    get inPenaltyBox(): boolean {
        return this._inPenaltyBox;
    }

    putIntoPenaltyBox() {
        this._inPenaltyBox = true;
    }
}