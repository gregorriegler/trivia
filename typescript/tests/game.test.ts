import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Game} from '../src/game';

describe('Game', () => {
    it('should add players and initialize them', () => {
        let game = new Game();

        game.add("player1");
        game.add("player2");
        game.add("player3");

        expect(game.playerName(0)).to.equal("player1")
        expect(game.playerName(1)).to.equal("player2")
        expect(game.playerName(2)).to.equal("player3")
        expect(game.place(0)).to.equal(0)
        expect(game.place(1)).to.equal(0)
        expect(game.place(2)).to.equal(0)
        expect(game.purse(0)).to.equal(0)
        expect(game.purse(1)).to.equal(0)
        expect(game.purse(2)).to.equal(0)
        expect(game.isInPenaltyBox(0)).to.equal(false)
        expect(game.isInPenaltyBox(1)).to.equal(false)
        expect(game.isInPenaltyBox(2)).to.equal(false)
    });

    it('should put player in penalty box on wrong answer', () => {
        let game = new Game()
        game.add("player1")

        game.wrongAnswer()

        expect(game.isInPenaltyBox(0)).to.equal(true)
    });

    it('should switch to next player on wrong answer', () => {
        let game = new Game()
        game.add("player1")
        game.add("player2")

        game.wrongAnswer()

        expect(game.currentPlayerName()).to.equal("player2")
    });

    it('should rotate players on wrong answers', () => {
        let game = new Game()
        game.add("player1")
        game.add("player2")

        game.wrongAnswer()
        game.wrongAnswer()

        expect(game.currentPlayerName()).to.equal("player1")
    });

    it('should increase purse on correct answer, if not in penalty', () => {
        let game = new Game()
        game.add("player1")

        game.wasCorrectlyAnswered()

        expect(game.currentPlayerPurse()).to.equal(1)
    });

    it('should rotate players on correct answer, if not in penalty', () => {
        let game = new Game()
        game.add("player1")
        game.add("player2")

        game.wasCorrectlyAnswered()

        expect(game.currentPlayerName()).to.equal("player2")
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
        game.gettingOutOfPenaltyBox()

        let win = game.wasCorrectlyAnswered()

        expect(win).to.be.true
    });

    let questions = [
        ['Pop Question 0', [0, 4, 8]],
        ['Science Question 0', [1, 5, 9]],
        ['Sports Question 0', [2, 6, 10]],
        ['Rock Question 0', [3, 7, 11]]
    ]

    for (const question of questions) {
        let rolls:number[] = <number[]> question[1];
        for (const roll of rolls) {
            it('should ask: ' + question[0] + ' for roll ' + roll, () => {
                let game = new GameTest()
                game.add("player1")

                game.roll(roll)

                expect(game.shownQuestions).to.include(question[0])
            })
        }
    }

    class GameTest extends Game {
        public shownQuestions: Array<string> = [];

        showQuestion(message) {
            this.shownQuestions.push(message)
            super.showQuestion(message)
        }
    }
});
