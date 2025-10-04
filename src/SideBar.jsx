import './SideBar.css';
import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";

function SideBar(){
    
const inputRef = useRef(null);
const [howManyDays,setHowManyDays] = useState(1);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
    libraries: ["places"],
  });

  const [activeBox, setActiveBox] = useState(-1);

  const menuItems = [
    { id: "temperature", label: "🌡️ Temperature" },
    { id: "quantityOfWater", label: "💧 Amount of precipitation" },
    { id: "probOfPrecipitation", label: "🌬️ Probability of precipitation" },
    { id: "visibility", label: "💦 Visibility" },
    { id: "pressure", label: "🧭 Pressure" },
    { id: "windSpeed", label: "☁️ Wind Speed" }
  ];

  const handleClick = (index) => {
    setActiveBox(index)
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

  
  };

  if (!isLoaded) return <div>Ładowanie...</div>;

  return(
    <aside>
      <h1 style={{color:"white"}}>Data</h1>
      <br></br>
      <StandaloneSearchBox 
        onLoad={(ref) => (inputRef.current = ref)}
        onPlacesChanged={handleOnPlacesChange}
      >
        <input
          type="text"
          placeholder="Search your location"
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
      <p>Choose how many days</p>
      <input type="range" min={1} max={16} onChange={()=>{setHowManyDays(this.value)}}/>
      <p>{howManyDays}</p>
      <br></br>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={index === activeBox ? "active" : "menuItems"}
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
