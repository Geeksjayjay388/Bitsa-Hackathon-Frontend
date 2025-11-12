import { BrowserRouter,Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/events" element= {<Events/>} />
        <Route path="/gallery" element= {<Gallery/>} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;