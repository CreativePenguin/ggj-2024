import React, { useState } from 'react';

const TextToSpeech = () => {
    const textInputField = document.querySelector("#text-input")
    const utterThis = new SpeechSynthesisUtterance()
    const synth = window.speechSynthesis
    let [words, setWords] = useState('');

    const checkBrowserCompatibility = () => {
        "speechSynthesis" in window
            ? console.log("Web Speech API supported!")
            : console.log("Web Speech API not supported :-(")
    }

    checkBrowserCompatibility()

    const submitWords = (event) => {
        event.preventDefault()
        utterThis.text = words
        synth.speak(utterThis)
    }

    return (
      <form onSubmit={submitWords}>
        <label>Enter words:
          <input type="text" value={words} onChange={(e) => setWords(e.target.value)}/>
          <button type="submit">Submit</button>
        </label>
      </form>
    )
  }

export default TextToSpeech;