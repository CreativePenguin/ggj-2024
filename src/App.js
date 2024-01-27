import React, { useRef, useState, useEffect } from 'react';

const App = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [volume, setVolume] = useState(0);

  const canvasRef = useRef();

  useEffect(() => {
    const initAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);

        setAudioContext(audioCtx);
        setMediaStream(stream);

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        analyser.connect(audioCtx.destination);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const averageVolume = dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;

          // Use volume value as needed
          setVolume(averageVolume);
        };

        const drawVisualizer = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.fillStyle = 'blue';
          const barWidth = (canvasWidth / analyser.frequencyBinCount) * 2.5;

          for (let i = 0; i < dataArray.length; i++) {
            const barHeight = (dataArray[i] / 255) * canvasHeight;
            ctx.fillRect(i * barWidth, canvasHeight - barHeight, barWidth, barHeight);
          }

          // Update visualizer at a slower rate (every 200 milliseconds)
          setTimeout(() => requestAnimationFrame(drawVisualizer), 1000);
        };

        requestAnimationFrame(drawVisualizer);

        const intervalId = setInterval(updateVolume, 1000);

        return () => {
          clearInterval(intervalId);
          stream.getTracks().forEach((track) => track.stop());
        };
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    };

    initAudioContext();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [audioContext]);

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="100" style={{ border: '1px solid #000' }} />
      <p>Volume: {volume}</p>
    </div>
  );
};

export default App;
