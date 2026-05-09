import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpComponent from './components/SignUpComponent';
import SignInComponent from './components/SignInComponent';
import AddProduct from './components/AddProduct';
import AddService from './components/AddService';
import ProductsComponent from './components/ProductsComponent';
import CartComponent from './components/CartComponent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import HomeComponent from './components/HomeComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import MakePayment from "./components/MakePayment"; // Later

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main className="container-fluid">
          <Routes>
            <Route path='/signup' element={<SignUpComponent />} />
            <Route path='/signin' element={<SignInComponent />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/addservice' element={<AddService />} />
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/products' element={<ProductsComponent type="products" />} />
            <Route path='/services' element={<ProductsComponent type="services" />} />
            <Route path='/' element={<HomeComponent />} />
            <Route path='/cart' element={<CartComponent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

