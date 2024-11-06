import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import Episodes from "./pages/Episodes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTopButton from "./components/ScrollTopButton";
import CharacterDetails from "./pages/CharacterDetails";
import LocationDetails from "./pages/LocationDetails";
import EpisodeDetails from "./pages/EpisodeDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/location/:id" element={<LocationDetails />} />
          <Route path="/episode/:id" element={<EpisodeDetails />} />
        </Routes>
      </main>
      <Footer />
      <ScrollTopButton />
    </BrowserRouter>
  );
}

export default App;
