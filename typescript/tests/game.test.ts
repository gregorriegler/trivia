import {expect} from 'chai';
import {describe, it, fit, beforeEach} from 'mocha';
import {Game} from '../src/game';

describe('Game', () => {

    beforeEach(function () {
        console.messages = "";
    })

    it('should add players', () => {
        let game = new Game();

        game.add("player1");
        game.add("player2");
        game.add("player3");

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "player2 was added\n" +
            "They are player number 2\n" +
            "player3 was added\n" +
            "They are player number 3\n"
        )
    });

    it('should switch to next player on wrong answer', () => {
        let game = new Game()
        game.add("player1")
        game.add("player2")

        game.wrongAnswer()

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "player2 was added\n" +
            "They are player number 2\n" +
            "Question was incorrectly answered\n" +
            "player1 was sent to the penalty box\n"
        )
    });

    it('should rotate players on wrong answers', () => {
        let game = new Game()
        game.add("player1")
        game.add("player2")

        game.wrongAnswer()
        game.wrongAnswer()

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "player2 was added\n" +
            "They are player number 2\n" +
            "Question was incorrectly answered\n" +
            "player1 was sent to the penalty box\n" +
            "Question was incorrectly answered\n" +
            "player2 was sent to the penalty box\n"
        )
    });

    it('should increase gold count on correct answer', () => {
        let game = new Game()
        game.add("player1")

        game.wasCorrectlyAnswered()

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "Answer was correct!!!!\n" +
            "player1 now has 1 Gold Coins.\n"
        )
    });

    it('should rotate players on correct answer', () => {
        let game = new Game()
        game.add("player1")
        game.add("player2")

        game.wasCorrectlyAnswered()
        game.wasCorrectlyAnswered()

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "player2 was added\n" +
            "They are player number 2\n" +
            "Answer was correct!!!!\n" +
            "player1 now has 1 Gold Coins.\n" +
            "Answer was correct!!!!\n" +
            "player2 now has 1 Gold Coins.\n"
        )
    });

    it('should make a player win, if player purse not 6', () => {
        let game = new Game()
        game.add("player1")

        let win = game.wasCorrectlyAnswered();

        expect(win).to.be.true
    });

    it('should not make a player win, if player purse is 6', () => {
        let game = new Game()
        game.add("player1")

        game.wasCorrectlyAnswered()
        game.wasCorrectlyAnswered()
        game.wasCorrectlyAnswered()
        game.wasCorrectlyAnswered()
        game.wasCorrectlyAnswered()
        let win = game.wasCorrectlyAnswered();

        expect(win).to.be.false
    });

    it('should make a player win, if answered correctly and in penalty box', () => {
        let game = new Game()
        game.add("player1")
        game.wrongAnswer()

        let win = game.wasCorrectlyAnswered()

        expect(win).to.be.true
    });

    it('should make a player win, if getting out of penalty box and answered correctly', () => {
        let game = new Game()
        game.add("player1")
        game.wrongAnswer()
        game.roll(3)

        let win = game.wasCorrectlyAnswered()

        expect(win).to.be.true
    });

    it('should keep a player in penalty box', () => {
        let game = new Game()
        game.add("player1")
        game.wrongAnswer()

        game.roll(2)

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "Question was incorrectly answered\n" +
            "player1 was sent to the penalty box\n" +
            "player1 is the current player\n" +
            "They have rolled a 2\n" +
            "player1 is not getting out of the penalty box\n"
        )
    });

    it('should keep a player in penalty box', () => {
        let game = new Game()
        game.add("player1")
        game.wrongAnswer()

        game.roll(3)

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "Question was incorrectly answered\n" +
            "player1 was sent to the penalty box\n" +
            "player1 is the current player\n" +
            "They have rolled a 3\n" +
            "player1 is getting out of the penalty box\n" +
            "player1's new location is 3\n" +
            "The category is Rock\n" +
            "Rock Question 0\n"
        )
    });

    it('should keep a player in penalty box', () => {
        let game = new Game()
        game.add("player1")
        game.roll(12)
        game.wrongAnswer()

        game.roll(2)

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "player1 is the current player\n" +
            "They have rolled a 12\n" +
            "player1's new location is 0\n" +
            "The category is Pop\n" +
            "Pop Question 0\n" +
            "Question was incorrectly answered\n" +
            "player1 was sent to the penalty box\n" +
            "player1 is the current player\n" +
            "They have rolled a 2\n" +
            "player1 is not getting out of the penalty box\n"
        )
    });

    it('should keep a player in penalty box', () => {
        let game = new Game()
        game.add("player1")
        game.roll(11)
        game.wrongAnswer()

        game.roll(3)

        expect(console.messages).to.eq(
            "player1 was added\n" +
            "They are player number 1\n" +
            "player1 is the current player\n" +
            "They have rolled a 11\n" +
            "player1's new location is 11\n" +
            "The category is Rock\n" +
            "Rock Question 0\n" +
            "Question was incorrectly answered\n" +
            "player1 was sent to the penalty box\n" +
            "player1 is the current player\n" +
            "They have rolled a 3\n" +
            "player1 is getting out of the penalty box\n" +
            "player1's new location is 2\n" +
            "The category is Sports\n" +
            "Sports Question 0\n"
        )
    });

    let questions = [
        ['Pop Question 0', 'Pop', [0, 4, 8]],
        ['Science Question 0', 'Science', [1, 5, 9]],
        ['Sports Question 0', 'Sports', [2, 6, 10]],
        ['Rock Question 0', 'Rock', [3, 7, 11]]
    ]

    for (const question of questions) {
        let rolls: number[] = <number[]>question[2];
        for (const roll of rolls) {
            it('should ask: ' + question[0] + ' for roll ' + roll, () => {
                let game = new Game()
                game.add("player1")

                game.roll(roll)

                expect(console.messages).to.eq(
                    "player1 was added\n" +
                    "They are player number 1\n" +
                    "player1 is the current player\n" +
                    "They have rolled a " + roll + "\n" +
                    "player1's new location is " + roll + "\n" +
                    "The category is " + question[1] + "\n" +
                    question[0] + "\n"
                )
            })
        }
    }
});

var log = console.log;
declare var console;
console.messages = "";
console.log = function (message) {
    this.messages += message + "\n"
    log(message)
}