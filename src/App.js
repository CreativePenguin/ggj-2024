import React, { useState } from 'react';
import tripathi from './tripathi.png';
import './App.css';
import buttonClickSound from './buttonClickSound.mp3'; // Import your MP3 file

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
      Click me!
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

const App = () => {
  const [buttons, setButtons] = useState([
    {
      id: 1,
      top: getRandomPosition().top,
      left: getRandomPosition().left,
      visible: true,
    },
  ]);

  const handleButtonClick = (buttonId) => {
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
  };

  return (
    <div className="app-container">
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
      <img className="moving-logo" src={tripathi} alt="Logo" />
    </div>
  );
};

export default App;
