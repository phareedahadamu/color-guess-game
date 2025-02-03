import "./App.css";
import { colors } from "./colors";
import { useState, useRef } from "react";
import Button from "./componets/Button";
import confetti from "./assets/confetti2.gif";
import sad from "./assets/sad.gif";

function App() {
  // Refs
  const indexRef = useRef(0);
  const correctGuesses = useRef(0);

  // States
  const randomI = Math.floor(Math.random() * 6);
  const [colorFamily, setColorFamily] = useState(() =>
    selectColorFamily(indexRef.current, randomI)
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
  function selectColorFamily(i, randomIndex) {
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
    const randomIndex = Math.floor(Math.random() * 6);
    setClickedColor(color);
    correctGuesses.current =
      color === colorFamily.selectedColor
        ? correctGuesses.current + 1
        : correctGuesses.current;
    setTimeout(() => {
      setClickedColor(null);
      indexRef.current = indexRef.current === 4 ? 0 : indexRef.current + 1;
      setColorFamily(() => selectColorFamily(indexRef.current, randomIndex));
    }, 1350);
  }
  function startNewGame() {
    const randomIndex = Math.floor(Math.random() * 6);
    indexRef.current = 0;
    correctGuesses.current = 0;
    setClickedColor(null);
    setColorFamily(() => selectColorFamily(indexRef.current, randomIndex));
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
          {colorFamily.selectedColor !== clickedColor &&
            clickedColor !== null && (
              <img className="sad" src={sad} alt="sad gif" />
            )}
          {clickedColor !== null ? (
            clickedColor === colorFamily.selectedColor ? (
              <p data-testid="gameStatus" style={{ color: "#7272fe" }}>
                Thats right. Good job!
              </p>
            ) : (
              <p data-testid="gameStatus" style={{ color: "red" }}>
                Oops! Wrong guess.
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
