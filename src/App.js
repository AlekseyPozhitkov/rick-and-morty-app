import React from 'react'
import Characters from './pages/Characters/Characters'
import Locations from './pages/Locations/Locations'
import Episodes from './pages/Episodes/Episodes'
import Navbar from './components/Navbar/Navbar'
import MyButton from './components/Button/MyButton'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={< Characters />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
      </Routes>
      <MyButton />
      <Footer />
    </BrowserRouter>
  )
}

export default App