import React, { useRef, useState, useEffect } from 'react';

const SpeechToText = () => {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  var positiveWords = [
    'like', 'love', 'special', 'university at buffalo'
  ]
  var grammar = `#JSGF V1.0; grammar positive words; public <color> = ${positiveWords.join(
    " | ",
  )}`;
  const speechRecognitionList = new SpeechGrammarList();
  const recognition = new SpeechRecognition();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    setSpokenWords(event.results[0][0].transcript);
    // diagnostic.textContent = `Result received: ${color}.`;
    // bg.style.backgroundColor = color;
    console.log(`Confidence: ${event.results[0][0].confidence}`);
  };

  recognition.onspeechend = (event) => {
    recognition.stop();
    console.log('stopped');
  }
  
  const [spokenWords, setSpokenWords] = useState('');

  return (
    <div>
      <button onClick={() => {
          console.log('recognition start');
          recognition.start()
        }}>Say Something!</button>
      <button onClick={() => {
        console.log('recognition stop');
        recognition.stop()
        }}>Stop Recording</button>
      <br />
      Spoken words: {spokenWords}
    </div>
  )
}

export default SpeechToText;
