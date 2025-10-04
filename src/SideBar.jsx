import './SideBar.css';
import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

function SideBar({setWeatherData}){
    
  const inputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
    libraries: ["places"],
  });

  const [activeIndices, setActiveIndices] = useState([]);

  const menuItems = [
    { id: "temperature", label: "🌡️ Temperatura" },
    { id: "precipitation", label: "💧 Opady" },
    { id: "wind", label: "🌬️ Wiatr" },
    { id: "humidity", label: "💦 Wilgotność" },
    { id: "pressure", label: "🧭 Ciśnienie" },
    { id: "clouds", label: "☁️ Zachmurzenie" },
    { id: "extreme", label: "⚡ Zjawiska ekstremalne" },
    { id: "map_sat", label: "🗺️ Mapa satelitarna" },
    { id: "map_rain", label: "🌧️ Mapa opadów" },
    { id: "map_temp", label: "🔥 Mapa temperatur" },
    { id: "aqi", label: "🏭 Jakość powietrza" },
  ];

  const handleClick = (index) => {
    if (activeIndices.includes(index)) {
      setActiveIndices(activeIndices.filter((i) => i !== index));
    } else {
      setActiveIndices([...activeIndices, index]);
    }
  };
  

  const handleOnPlacesChange = async () => {
  if (!inputRef.current) return;
  const places = inputRef.current.getPlaces();
  if (!places || places.length === 0) return;

  const place = places[0];
  if (!place.geometry || !place.geometry.location) return;

  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();

  const url = `http://127.0.0.1:8000/daily-forecast?lat=${lat}&lng=${lng}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    setWeatherData(data);
    
  } catch (error) {
    console.error("Błąd pobierania z backendu:", error);
  }
};

  if (!isLoaded) return <div>Ładowanie...</div>;

  return(
    <aside>
      <h1 style={{color:"white"}}>Dane</h1>
      <br></br>
      <StandaloneSearchBox 
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handleOnPlacesChange}
      >
        <input
          type="text"
          placeholder="Wyszukaj miejscowość"
          style={{
            width: "80%",
            height: "25px",
            padding: "0 10px",
            borderRadius: "4px",
            border: "2px solid #ccc",
            fontSize: "16px",
            margin: "10px 0"
            }}
        />
      </StandaloneSearchBox>
      <br></br>
     
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={activeIndices.includes(index) ? "active" : "menuItems"}
              onClick={() => handleClick(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      
    </aside>
  )
}

export default SideBar;
