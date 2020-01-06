import React, { Component } from "react";

const divisions = 5;
const imageSize = 500;
const winningCondition = [...Array(divisions * divisions)].map((_, i) => i);

const shuffle = (a: number[]) => a.sort(() => 0.5 - Math.random());
const swapPlaces = (arr: number[], index1: number, index2: number) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  return arr;
};

export default class Game extends Component<
  {},
  { tiles: number[], showReset: boolean, message: string }
  > {
  constructor(props: {}) {
    super(props);
    this.state = {
      tiles: shuffle([...winningCondition]),
      showReset: false,
      message: ""
    };
  }

  resetGame = () =>
    this.setState({
      tiles: shuffle([...winningCondition]),
      showReset: false,
      message: ""
    });

  renderTile = (position: number, idx: number) => (
    <div
      className="tile"
      key={idx}
      onClick={this.moveTile(idx)}
      style={{
        opacity: position === 0 ? 0 : 100,
        backgroundPosition: `${imageSize -
          (position % divisions) * (imageSize / divisions)}px ${imageSize -
          Math.floor(position / divisions) * (imageSize / divisions)}px`
      }}
    >
      {position}
    </div>
  );

  moveTile = (origin: number) => () => {
    const tiles = this.state.tiles;
    if (
      tiles[origin - 1] === 0 ||
      tiles[origin + 1] === 0 ||
      tiles[origin - divisions] === 0 ||
      tiles[origin + divisions] === 0
    ) {
      const swappedTiles = swapPlaces(tiles, origin, tiles.indexOf(0));
      if (swappedTiles.toString() === winningCondition.toString()) {
        this.setState({ showReset: true, message: "Ganaste" });
      }
      this.setState({ tiles: swappedTiles });
    }
  };

  render() {
    const { tiles, showReset, message } = this.state;
    return (
      <>
        <div id="container">{tiles.map(this.renderTile)}</div>

        {message}
        {showReset && <button onClick={this.resetGame}>Empezar Denuevo</button>}
      </>
    );
  }
}
