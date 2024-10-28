"use client";

import { useState } from "react";

function Square({value, onSquareClick, highlight}) {
  return (
    <button className={highlight} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }

  function handleHighlight(i){
    if(winners) {
      for (let a = 0; a < winners.length; a++){
        if(winners[a] === i ){
          return "square win";
        }
      }
      return "square";
    } else {
      return "square";
    }
  }

  const winners = calculateWinner(squares)
  let status;
  if (winners) {
    status = "Winner: " + squares[winners[0]];
  } else if (currentMove === 9){
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function MakeSquares() {
    const row = [];
    for (let i = 0; i < 9; i=i+3) {
      row.push(
        <div className="board-row">
        <Square value={squares[0+i]} onSquareClick={() => handleClick(0+i)} highlight={handleHighlight(0+i)}/>
        <Square value={squares[1+i]} onSquareClick={() => handleClick(1+i)} highlight={handleHighlight(1+i)}/>
        <Square value={squares[2+i]} onSquareClick={() => handleClick(2+i)} highlight={handleHighlight(2+i)}/>
        </div>
      );
    }
    return row;
  }
  
  return (
    <>
      <div className="status">{status}</div>
      {/* <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} highlight={handleHighlight(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} highlight={handleHighlight(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} highlight={handleHighlight(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} highlight={handleHighlight(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} highlight={handleHighlight(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} highlight={handleHighlight(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} highlight={handleHighlight(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} highlight={handleHighlight(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} highlight={handleHighlight(8)}/>
      </div> */}
      
      <MakeSquares />
      
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a ,b ,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return lines[i];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
      if (move === history.length -1) {
        return <li key={move}>You are at move # {move}</li>
      }
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
