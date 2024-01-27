import * as React from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

export default function App() {
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder
  } = useAudioRecorder();
  
  const [isContinousRecording, toggleContinuousRecording] = React.useState(false)

  const continuousRecording = () => {
    toggleContinuousRecording(!isContinousRecording);
    while(isContinousRecording) {
      startRecording();
      setTimeout(() => {
        stopRecording();
        addAudioElement(recordingBlob);
      }, 1000);
      startRecording();
    }
  }

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
        // downloadOnSavePress={true}
        // downloadFileExtension="mp3"
        showVisualizer={true}
      />
      <br />
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      <br />
      <button onClick={continuousRecording}>Continuous Recording</button>
      <button onClick={() => toggleContinuousRecording(false)}>Stop no matter what</button>
    </div>
  );
}
