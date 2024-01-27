import React, { useState, useEffect } from 'react';
import tripathi from './tripathi.png';
import tripathi2 from './tripathi2.png';
import './App.css';
import buttonClickSound from './buttonClickSound.mp3'; // Import your MP3 file

const RandomButton = ({ onClick, top, left, soundEnabled }) => {
  const handleClick = () => {
    onClick();
    if (soundEnabled) {
      playButtonClickSound();
    }
  };

  const playButtonClickSound = () => {
    const audio = new Audio(buttonClickSound);
    audio.play();
  };

  return (
    <button
      className="random-button"
      style={{ position: 'absolute', top: top, left: left }}
      onClick={handleClick}
    >
      Click me!
    </button>
  );
};

const Countdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(intervalId);
      onComplete();
    }

    return () => clearInterval(intervalId);
  }, [count, onComplete]);

  return (
    <div className="countdown-container">
      <h1 className="countdown-text">{count}</h1>
    </div>
  );
};

const getRandomPosition = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const randomTop = Math.random() * (windowHeight - 50);
  const randomLeft = Math.random() * (windowWidth - 100);

  return { top: randomTop + 'px', left: randomLeft + 'px' };
};

const App = () => {
  const [buttons, setButtons] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15); // Set the initial time limit in seconds
  const [gameOver, setGameOver] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [tripathiImage, setTripathiImage] = useState(tripathi);

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted]); // Run this effect when the gameStarted state changes

  useEffect(() => {
    // When time is up, stop the game
    if (time > 0 && gameStarted) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up the interval when the component unmounts or the game is over
      return () => clearInterval(intervalId);
    } else if (gameStarted) {
      setGameOver(true);
    }
  }, [time, gameStarted, setGameOver]);

  const initializeGame = () => {
    setButtons([
      {
        id: 1,
        top: getRandomPosition().top,
        left: getRandomPosition().left,
        visible: true,
      },
    ]);

    setScore(0);
    setTime(15);
    setGameOver(false);
    setTripathiImage(tripathi);
  };

  const handleButtonClick = (buttonId) => {
    if (buttonId === 'tripathi') {
      setScore((prevScore) => Math.max(0, prevScore - 2)); // Deduct 2 points
      setTripathiImage(tripathi2); // Change the image to tripathi2
      setTimeout(() => {
        setTripathiImage(tripathi); // Revert back to the original image after 2 seconds
      }, 2000);
    } else {
      setScore((prevScore) => prevScore + 1);

      setButtons((prevButtons) =>
        prevButtons.map((button) =>
          button.id === buttonId
            ? { ...button, visible: false }
            : { ...button }
        )
      );

      // Spawn a new button
      setButtons((prevButtons) => [
        ...prevButtons,
        {
          id: prevButtons.length + 1,
          top: getRandomPosition().top,
          left: getRandomPosition().left,
          visible: true,
        },
      ]);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setShowCountdown(true);

    setTimeout(() => {
      setShowCountdown(false);
      initializeGame();
    }, 3000);
  };

  const handleStartAgain = () => {
    setShowCountdown(true);

    setTimeout(() => {
      setShowCountdown(false);
      initializeGame();
    }, 3000);
  };

  const toggleSound = () => {
    setSoundEnabled((prevSoundEnabled) => !prevSoundEnabled);
  };

  return (
    <div className="app-container">
      {!gameStarted && (
        <div className="start-container">
          <h1 className="start-title">Welcome to the Game!</h1>
          <p className="instructions">Click on the "Click me!" button to score points. Clicking on Tripathi will deduct 2 points. You have 15 seconds. Ready?</p>
          <button className="start-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <div>
          <p>Score: {score}</p>
          <p>Time: {time} seconds</p>
          {buttons.map((button) =>
            button.visible ? (
              <RandomButton
                key={button.id}
                onClick={() => handleButtonClick(button.id)}
                top={button.top}
                left={button.left}
                soundEnabled={soundEnabled}
              />
            ) : null
          )}
          <img
            className="moving-logo"
            src={tripathiImage}
            alt="Logo"
            onClick={() => handleButtonClick('tripathi')}
          />
        </div>
      )}

      {gameOver && (
        <div className="game-over-container">
          <div className="game-over">
            <h1 className="game-over-title" style={{ textAlign: 'center', color: 'red' }}>
              Game Over!
            </h1>
            <p>Your Score: {score}</p>
            <button className="start-again-button" onClick={handleStartAgain}>
              Start Again
            </button>
            {showCountdown && <Countdown onComplete={handleStartAgain} />}
            <br />
            <label>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={toggleSound}
              />
              Mute Sound
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
