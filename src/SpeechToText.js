import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css'
import tripathi from './tripathi.png';
import tripathi2 from './tripathi2.png';

const SpeechToText = () => {

  const [message, setMessage] = useState('')
  const [tripathiState, setTripathiState] = useState(tripathi);
  const commands = [
    {
      command: '*University at Buffalo*',
      callback: () => setMessage('yay!')
    },
    {
      command: '*hate*',
      callback: () => setTripathiState(tripathi2)
    }
  ]

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div class="tripathi-logo">
      <img src={tripathiState} class='tripathi-logo' />
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{message}</p>
    </div>
  );
};
export default SpeechToText;
