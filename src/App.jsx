import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import Header from './Header.jsx'
import SideBar from './SideBar.jsx'
import DashBoard from './Dashboard.jsx'
import Aurora from './Aurora';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [days,setDays] = useState(null)
  const [active,setActive] = useState(null)

  
  return (
  <>
  <Aurora
    colorStops={["#3A29FF", "#0096FF", "#89CFF0"]}
    blend={0.5}
    amplitude={1}
    speed={0.5}
  />
     <Header weatherData={weatherData}>Weather App with TTS</Header>
     <SideBar setWeatherData={setWeatherData} setNumOfDays={setDays} setactiveBox={setActive}/>
     <DashBoard weatherData={weatherData} days={days} active={active}/>
</>
  )
}

export default App
