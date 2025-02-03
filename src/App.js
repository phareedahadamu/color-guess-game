import "./App.css";
import { colors } from "./colors";
import { useState, useRef } from "react";
import Button from "./componets/Button";
import icon from "./assets/refresh-svgrepo-com.svg";
import confetti from "./assets/confetti2.gif";

function App() {
  // Refs
  const indexRef = useRef(0);
  const correctGuesses = useRef(0);

  // States
  const [colorFamily, setColorFamily] = useState(() =>
    selectColorFamily(indexRef.current)
  );
  const [clickedColor, setClickedColor] = useState(null);

  // Mapped Elements
  const buttonElements = colorFamily.colorGroup.map((c) => {
    const style = { backgroundColor: c };
    return (
      <Button
        handleClick={handleButtonClick}
        style={style}
        key={c}
        color={c}
        clickedColor={clickedColor}
      />
    );
  });

  // State setting function
  function selectColorFamily(i) {
    const randomIndex = Math.floor(Math.random() * colors[i].length);
    return {
      colorGroup: colors[i],
      selectedColor: colors[i][randomIndex],
      style: {
        backgroundColor: colors[i][randomIndex],
      },
    };
  }

  // On click handlers
  function handleButtonClick(color) {
    setClickedColor(color);
    correctGuesses.current =
      color === colorFamily.selectedColor
        ? correctGuesses.current + 1
        : correctGuesses.current;
  }
  function startNewGame() {
    indexRef.current = indexRef.current === 4 ? 0 : indexRef.current + 1;
    setClickedColor(null);
    setColorFamily(() => selectColorFamily(indexRef.current));
  }
  function retry() {
    setClickedColor(null);
  }

  return (
    <main>
      <h1>Color Game</h1>
      <p data-testid="gameInstructions" className="instructions">
        Test your color perception by clicking on the button that is the exact
        same as the box
      </p>
      <div className="score-container">
        <p>Score</p>
        <h2 data-testid="score">{correctGuesses.current}</h2>
      </div>
      <div className="wrapper">
        <div
          data-testid="colorBox"
          className="color-div"
          style={colorFamily.style}
        ></div>
        <div className="status-container">
          {colorFamily.selectedColor === clickedColor && (
            <img className="confetti" src={confetti} alt="confetti gif" />
          )}
          {clickedColor !== null ? (
            clickedColor === colorFamily.selectedColor ? (
              <p data-testid="gameStatus" style={{ color: "#7272fe" }}>
                Thats right. Good job!
              </p>
            ) : (
              <p data-testid="gameStatus" style={{ color: "red" }}>
                Oops! Wrong guess. Try again?
                <button onClick={() => retry()}>
                  <img src={icon} alt="refresh icon" />
                </button>
              </p>
            )
          ) : (
            <p data-testid="gameStatus" style={{ color: "#838395" }}>
              Click a button to start.
            </p>
          )}
        </div>
        <div className="button-container">{buttonElements}</div>
        <button
          className="new-btn"
          data-testid="newGameButton"
          onClick={() => startNewGame()}
        >
          New Game
        </button>
      </div>
    </main>
  );
}

export default App;
