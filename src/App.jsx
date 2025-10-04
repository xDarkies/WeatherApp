import { useState } from 'react'
import './App.css'
import Button from './Button.jsx'
import Header from './Header.jsx'
import SideBar from './SideBar.jsx'
import DashBoard from './Dashboard.jsx'


function App() {

  return (
    <div id="Container">
      <Header></Header>
      <SideBar></SideBar>
      <DashBoard></DashBoard>
    </div>
  )
}

export default App
