import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollTopButton } from "./components/ScrollTopButton";
import CharacterDetails from "./pages/CharacterDetails";
import Characters from "./pages/Characters";
import EpisodeDetails from "./pages/EpisodeDetails";
import Episodes from "./pages/Episodes";
import LocationDetails from "./pages/LocationDetails";
import Locations from "./pages/Locations";

export const App = () => {
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
};
