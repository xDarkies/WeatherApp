import './Header.css'
import Button from './Button'
import mic from './assets/microphone.png'
import AudioPlayer from "./AudioPlayer";
import { useState, useEffect } from "react";

function Header(props){

   if (!props.weatherData) return;
   const daily = props.weatherData;
   const [audioBytes, setAudioBytes] = useState(null);
  

  useEffect(() => {
    const fetchAudio = async () => {
      const url = `http://127.0.0.1:2137/tts?text=temperatura wynosi ${daily.daily.temperature_2m_max[0]} stopni celcjusza`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Błąd pobierania");

        const arrayBuffer = await res.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        setAudioBytes(bytes);
      } catch (error) {
        console.error("Błąd pobierania z backendu:", error);
      }
    };

    fetchAudio();
  }, [props.weatherData]);

    return(
        <>
            <div id="Header">
                <span style={{fontSize:"45px"}}>{props.children}</span>
                <div style={{display:'flex'}}>
                <p style={{marginTop:"5px",marginRight:"10px"}}>Turn on transcription</p> 
                <Button height="30px" width="30px" background="none" borderRadius="5px">
                    <img src={mic} width={"25px"} height={"25px"}></img>
                </Button>
                </div>
            </div>

        </>
    );
}

export default Header;