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


});
