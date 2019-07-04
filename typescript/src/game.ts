export class Game {

    private players: Array<Player> = [];
    private currentPlayerIndex: number = 0;
    private currentPlayer: Player;
    private isGettingOutOfPrison: boolean = false;

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

        this.print(name + " was added");
        this.print("They are player number " + this.players.length);

        return true;
    }

    public roll(roll: number) {
        this.print(this.currentPlayer.name + " is the current player");
        this.print("They have rolled a " + roll);

        if (this.currentPlayer.inPrison) {
            if (this.isEven(roll)) {
                this.notGettingOutOfPrison();
                return;
            }
            this.gettingOutOfPrison();
        }

        this.playRound(roll);
    }

    private isEven(roll: number) {
        return roll % 2 == 0;
    }

    private playRound(roll: number) {
        this.currentPlayer.addToPlace(roll)
        if (this.currentPlayer.isPlaceBiggerThan11()) {
            this.currentPlayer.resetPlace()
        }

        this.print(this.currentPlayer.name + "'s new location is " + this.currentPlayer.place);
        this.print("The category is " + this.currentPlayer.category());
        this.askQuestion();
    }

    public wrongAnswer(): boolean {
        this.print('Question was incorrectly answered');
        this.print(this.currentPlayer.name + " was sent to the penalty box");
        this.currentPlayer.putIntoPrison();

        this.rotatePlayer();
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        let winner = !this.currentPlayer.inPrison || this.isGettingOutOfPrison
            ? this.correctAnswer()
            : true;
        this.rotatePlayer();
        return winner;
    }

    private askQuestion(): void {
        this.print(this.questions[this.currentPlayer.category()].shift());
    }

    private correctAnswer() {
        this.print("Answer was correct!!!!");
        this.currentPlayer.increasePurse();
        this.print(this.currentPlayer.name + " now has " + this.currentPlayer.purse + " Gold Coins.");

        return this.currentPlayer.didWin();
    }

    private notGettingOutOfPrison() {
        this.isGettingOutOfPrison = false;
        this.print(this.currentPlayer.name + " is not getting out of the penalty box");
    }

    private gettingOutOfPrison() {
        this.isGettingOutOfPrison = true;
        this.print(this.currentPlayer.name + " is getting out of the penalty box");
    }

    private rotatePlayer() {
        this.currentPlayerIndex += 1;
        if (this.currentPlayerIndex == this.players.length)
            this.currentPlayerIndex = 0;

        this.currentPlayer = this.players[this.currentPlayerIndex];
    }

    private print(message) {
        console.log(message);
    }
}

class Player {
    private readonly _name: string;
    private _place: number;
    private _purse: number;
    private _inPrison: boolean;

    constructor(name: string) {
        this._name = name;
        this._place = 0;
        this._purse = 0;
        this._inPrison = false;
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

    get inPrison(): boolean {
        return this._inPrison;
    }

    putIntoPrison() {
        this._inPrison = true;
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