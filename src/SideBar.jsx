import './SideBar.css';
import { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { geolocated } from "react-geolocated";

function SideBar({setWeatherData,setNumOfDays,setactiveBox}){
    
const inputRef = useRef(null);
const [coords, setCoords] = useState(null);
const [days, setDays] = useState(16)
const [activeBox, setActiveBox] = useState(0);

const onDaysChange = (index)=>{
    setDays(index);
    
}

useEffect(()=>{
  setNumOfDays(days);
},[days])

useEffect(()=>{
  setactiveBox(menuItems[activeBox].id);
},[activeBox])

useEffect(() => {
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        setCoords(newCoords);

        const url = `http://127.0.0.1:2137/daily-forecast?lat=${newCoords.lat}&lng=${newCoords.lng}`;
        
        try {
          const res = await fetch(url);
          const data = await res.json();
          setWeatherData(data);
          
          
        } catch (error) {
          console.error("Błąd pobierania z backendu:", error);
        }
      },
      (error) => {
        console.error("Błąd geolokalizacji:", error);
      }
    );
  }
}, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
    libraries: ["places"],
  });

  

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
 

  const url = `http://127.0.0.1:2137/daily-forecast?lat=${lat}&lng=${lng}`;
  

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
            fontSize: "16px",
            margin: "10px 0",
            backgroundColor:"#2e2f30",
            color:"white",
            }}
        />
      </StandaloneSearchBox>
      <br></br>
      <p style={{color:"white",padding: "10px 15px"}}>Choose how many days</p>
      <select id="days" value={days} onChange={()=>onDaysChange(document.querySelector('select').value)}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
      </select>
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
