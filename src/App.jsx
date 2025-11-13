import { BrowserRouter,Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/events" element= {<Events/>} />
        <Route path="/gallery" element= {<Gallery/>} /> 
        <Route path="/blog" element= {<Blog/>} />
        <Route path="/about" element= {<About/>} />
        <Route path="/contacts" element= {<Contact/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/signup" element= {<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;