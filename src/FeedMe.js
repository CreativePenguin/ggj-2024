import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import tripathi from './tripathi.png';
import coin from './coin.png';
import './App.css';
import buttonClickSound from './collect-coin.mp3'; // Import your MP3 file

const RandomButton = ({ onClick, top, left }) => {
  const handleClick = () => {
    onClick();
    playButtonClickSound();
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
      <img className="coin" src={coin} alt="Coin" />
    </button>
  );
};

const getRandomPosition = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const randomTop = Math.random() * (windowHeight - 50);
  const randomLeft = Math.random() * (windowWidth - 100);

  return { top: randomTop + 'px', left: randomLeft + 'px' };
};

const FeedMe = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [buttons, setButtons] = useState([]);
  const [timer, setTimer] = useState(15); // Set the initial timer duration in seconds
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []); // Run this effect when the component mounts

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  const initializeGame = () => {
    setButtons([
      {
        id: 1,
        top: getRandomPosition().top,
        left: getRandomPosition().left,
        visible: true,
      },
    ]);
    setTimer(15); // Reset the timer duration
    setScore(0); // Reset the score
    setGameOver(false);
  };

  const handleButtonClick = (buttonId) => {
    setButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.id === buttonId
          ? { ...button, visible: false }
          : { ...button }
      )
    );

    // Increment the score
    setScore((prevScore) => prevScore + 1);

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
  };

  const handleStartGame = () => {
    initializeGame();
  };

  return (
    <div className="app-container" onMouseMove={(event) => setPosition({ x: event.clientX, y: event.clientY })}>
      <img
        src={tripathi}
        alt="FEED ME"
        style={{ transform: `translate(${position.x + 5}px, ${position.y + 5}px)` }}
      />

      {!gameOver ? (
        <div>
          <p>Time left: {timer} seconds</p>
          <p>Score: {score}</p>
          {buttons.map((button) => (
            button.visible && (
              <RandomButton
                key={button.id}
                onClick={() => handleButtonClick(button.id)}
                top={button.top}
                left={button.left}
              />
            )
          ))}
        </div>
      ) : (
        <div>
          <h1>Game Over!</h1>
          <p>Your final score: {score}</p>
          <button onClick={handleStartGame}>Start New Game</button>
          <Link to="/" className="homepage-button">Go to Homepage</Link>
        </div>
      )}
    </div>
  );
};

export default FeedMe;
