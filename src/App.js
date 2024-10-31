import Characters from "./pages/Characters/Characters";
import Locations from "./pages/Locations/Locations";
import Episodes from "./pages/Episodes/Episodes";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTopButton from "./components/ScrollTopButton/ScrollTopButton";
import CharacterDetails from "./pages/Characters/CharacterDetails";

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
        </Routes>
      </main>
      <Footer />
      <ScrollTopButton />
    </BrowserRouter>
  );
}

export default App;
