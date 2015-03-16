"use strict";

var expect = require("chai").expect;
var Game = require("../js/utils/Game");

describe("board", function() {

  it("should return the state of a coordinates", function() {
    var x = 0, y = 0;
    var board = new Game().createBoard();
    expect(board.getCellState(x, y)).to.be.equal("empty");
  });

  it("should accept a new letter on specific coordinates", function() {
    var x = 0, y = 0;
    var board = new Game().createBoard();
    board.addLetter("A", 0, 0);
    expect(board.getCellState(x, y)).to.be.equal("A");
  });

  it("should get the bonus on a specific coordinates", function() {
    var board = new Game().createBoard();
    expect(board.getCellBonus(0, 0)).to.be.equal("TWS");
    expect(board.getCellBonus(4, 4)).to.be.equal("DWS");
    expect(board.getCellBonus(7, 7)).to.be.equal("DWS");
    expect(board.getCellBonus(2, 8)).to.be.equal("DLS");
    expect(board.getCellBonus(9, 13)).to.be.equal("TLS");
    expect(board.getCellBonus(9, 9)).to.be.equal("TLS");
  });

  it("should return a score when adding letter", function() {
    var board = new Game().createBoard();
    expect(board.getWordScore()).to.be.equal(0);
    expect(board.getCellScore(4, 7)).to.be.equal(0);
    board.addLetter("S", 4, 7);
    expect(board.getCellScore(4, 7)).to.be.equal(1);
    expect(board.getWordScore()).to.be.equal(1);
    board.addLetter("C", 5, 7);
    expect(board.getCellScore(5, 7)).to.be.equal(3);
    expect(board.getWordScore()).to.be.equal(4);
    board.addLetter("R", 6, 7);
    expect(board.getCellScore(6, 7)).to.be.equal(1);
    expect(board.getWordScore()).to.be.equal(5);
    board.addLetter("A", 7, 7);
    expect(board.getCellScore(7, 7)).to.be.equal(1);
    expect(board.getWordScore()).to.be.equal(12);
    board.addLetter("B", 8, 7);
    expect(board.getCellScore(8, 7)).to.be.equal(3);
    expect(board.getWordScore()).to.be.equal(18);
    board.addLetter("B", 9, 7);
    expect(board.getCellScore(9, 7)).to.be.equal(3);
    expect(board.getWordScore()).to.be.equal(24);
    board.addLetter("L", 10, 7);
    expect(board.getCellScore(10, 7)).to.be.equal(1);
    expect(board.getWordScore()).to.be.equal(26);
    board.addLetter("E", 11, 7);
    expect(board.getCellScore(11, 7)).to.be.equal(2);
    expect(board.getWordScore()).to.be.equal(30);
    expect(board.endTurn()).to.be.equal(true);
    expect(board.getWordScore()).to.be.equal(0);
  });
});
