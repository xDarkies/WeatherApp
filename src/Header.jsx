import './Header.css';
import Button from './Button';
import mic from './assets/microphone.png';
import { useState, useEffect, useRef } from "react";

function Header(props) {
  if (!props.weatherData) return null;

  const [audioBytes, setAudioBytes] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {

        const url = `http://127.0.0.1:2137/tts?text=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Błąd pobierania audio");

        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        setAudioBytes(bytes);
      } catch (error) {
        console.error("Błąd pobierania z backendu:", error);
      }

      const url1 = `http://127.0.0.1:2137/formatTTS?text=${props.weatherData}`;
        const textRes = await fetch(url1);
        const textRes2 = await textRes.json();
        if (!textRes.ok) throw new Error("Błąd formatowania TTS");
        const text = await textRes2.message;

    };

    fetchAudio();
  }, [props.weatherData]);

  useEffect(() => {
    if (audioBytes) {
      const url = URL.createObjectURL(new Blob([audioBytes], { type: 'audio/mp3' }));
      setAudioUrl(url);

      // cleanup old blob URLs
      return () => URL.revokeObjectURL(url);
    }
  }, [audioBytes]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div id="Header">
      <span style={{ fontSize: "45px" }}>{props.children}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginTop: "5px", marginRight: "10px" }}>Turn on transcription</p>
        <Button
          height="30px"
          width="30px"
          background="none"
          borderRadius="5px"
          onClick={handlePlay}
        >
          <img src={mic} width={"25px"} height={"25px"} alt="mic" />
        </Button>
      </div>
      {audioUrl && <audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />}
    </div>
  );
}

export default Header;
