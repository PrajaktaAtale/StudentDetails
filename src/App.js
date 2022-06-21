import './App.css';
import Signup from './components/SignUp';
import Login from "./components/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className='container'>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/login" element={<Login/>} />
       
    </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
