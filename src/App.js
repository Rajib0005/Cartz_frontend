import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from './components/Product/ProductDetails.js'
function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route  path='/products/:id' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
