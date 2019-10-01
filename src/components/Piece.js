import React, { Component } from "react";

export default class Piece extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      index: this.props.index,
      pos: this.props.initialPos
    };
  }

  movePieceHelper() {
    this.props.board.movePiece(
      this.state.pos,
      this.state.index,
      this.state.value
    );
  }

  render() {
    return (
      <div
        className="piece"
        style={{
          left: this.state.pos[1] * 67,
          top: this.state.pos[0] * 67
        }}
        onClick={this.movePieceHelper.bind(this)}
      >
        <p>{this.state.value}</p>
      </div>
    );
  }
}
