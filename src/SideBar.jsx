import './SideBar.css';
import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

function SideBar(){
    
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

    useEffect(() => {
        console.log("Nowe aktywne indeksy:", activeIndices);
    }, [activeIndices]);

  const handleOnPlacesChange = () => {
    if (!inputRef.current) return;
    const places = inputRef.current.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0];
    if (!place.geometry || !place.geometry.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    console.log("Wybrane miejsce:", lat, lng);  
  };

  if (!isLoaded) return <div>Ładowanie...</div>;

  return(
    <aside>
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
