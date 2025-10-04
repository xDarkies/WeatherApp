import './SideBar.css'
import { useState } from 'react';

function SideBar(){

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

  return(
    <>
    <aside>
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
    </>
  )
}

export default SideBar;
