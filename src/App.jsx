import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import Header from './Header.jsx'
import SideBar from './SideBar.jsx'
import DashBoard from './Dashboard.jsx'


function App() {

  const [weatherData, setWeatherData] = useState(null);

  return (
    <div id="Container">
      <Header></Header>
      <div id="Main">
        <SideBar setWeatherData={setWeatherData} />
        <DashBoard weatherData={weatherData} />
      </div>
    </div>
  )
}

export default App
