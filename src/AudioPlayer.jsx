import { useState, useEffect } from "react";

const AudioPlayer = ({ audioBytes }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (audioBytes) {
      const blob = new Blob([audioBytes], { type: "audio/mp3" }); 
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

  
      return () => URL.revokeObjectURL(url);
    }
  }, [audioBytes]);

  if (!audioUrl) return;

  return (
    <audio controls src={audioUrl} style={{ width: "100%" }}>
      Twoja przeglądarka nie wspiera odtwarzacza audio.
    </audio>
  );
};

export default AudioPlayer;