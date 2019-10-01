import React, { Component } from "react";
import Piece from "./Piece";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardSize: 9,
      pieceList: [],
      emptyPiece: [],
      facit: []
    };
  }

  componentDidMount() {
    this.initialBoard(this.state.boardSize);
  }

  render() {
    return (
      <div
        className="board"
        style={{
          width: 64 * 3,
          height: 64 * 3
        }}
      >
        {this.state.pieceList.map((piece, index) => (
          <Piece
            key={piece}
            value={piece[0]}
            index={index}
            initialPos={piece[1]}
            board={this}
          />
        ))}
      </div>
    );
  }

  movePiece(pos, index, value) {
    var tempEmptyPiece = this.state.emptyPiece;
    var tempPieceList = this.state.pieceList;

    var dx = Math.abs(pos[1] - tempEmptyPiece[1]);
    var dy = Math.abs(pos[0] - tempEmptyPiece[0]);

    if ((dy === 1 && dx === 0) || (dy === 0 && dx === 1)) {
      tempPieceList[index] = [value, tempEmptyPiece];

      this.setState({
        emptyPiece: pos,
        pieceList: tempPieceList
      });
      this.checkWin();
    } else {
      console.log("cannot move");
    }
  }

  generateGrid(boardSize) {
    var size = Math.sqrt(boardSize);
    var grid = [];
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        grid.push([i, j]);
      }
    }
    return grid;
  }

  initialBoard(boardSize) {
    var arr = new Array(boardSize - 1);
    var grid = this.generateGrid(boardSize);
    var positions = grid.slice(0, boardSize - 1);
    var tempEmptyPiece = grid[boardSize - 1];

    for (var i = 0; i < arr.length; i++) {
      arr[i] = i;
    }
    var tempFacit = arr.map((n, i) => [n, positions[i]]);
    console.log(tempFacit);

    var currentIndex = arr.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    var piecePos = arr.map((n, i) => [n, positions[i]]);
    this.setState({
      pieceList: piecePos,
      emptyPiece: tempEmptyPiece,
      facit: tempFacit
    });
  }

  checkWin() {
    if (this.state.facit === this.state.pieceList) {
      console.log("Victory!");
    }
  }
}
