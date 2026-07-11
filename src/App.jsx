import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./hero.jsx";
import CuratedCollections from "./CuratedCollections";
import SignupScreen from "./signup.jsx";
import LoginScreen from "./login.jsx";
function Home() {
  return <Hero />;
  
}




function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/SignupScreen" element={<SignupScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;