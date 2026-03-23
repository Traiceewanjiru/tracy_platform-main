import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import HomeComponent from './components/HomeComponent';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import AddServices from './components/AddServices';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       
        <header className="App-header">
          <h1>The Safespace</h1>
          <h6>Create awareness with us and share your journey with others.</h6>
        </header>
      </div>

      <Routes>
        <Route path='/signin' element={<SignInComponent />} />
        <Route path='/signup' element={<SignUpComponent />} />
        <Route path='/' element={<HomeComponent />} />
        <Route path='/addservice' element={<AddServices/>} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/aboutus' element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
