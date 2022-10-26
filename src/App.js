import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from './components/Product/ProductDetails.js'
import LoginSignup from "./components/User/LoginSignup";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route  exact path='/' element={<Home />} />
        <Route  exact path='/products/:id' element={<ProductDetails />} />
        <Route  exact path='/products' element={<Products />} />
        <Route  exact path='/search' element={<Search />} />
        <Route  exact path='/login' element={<LoginSignup />} />
        <Route  path='/products?keyword=' element={<Products />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
