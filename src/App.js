import React, { useEffect, useState } from 'react'
import Characters from './pages/Characters/Characters'
import Locations from './pages/Locations/Locations'
import Episodes from './pages/Episodes/Episodes'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingWrapper from './components/LoadingWrapper/LoadingWrapper'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <LoadingWrapper> {/* Оборачиваем Routes в наш компонент LoadingWrapper */}
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/episodes" element={<Episodes />} />
        </Routes>
      </LoadingWrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App