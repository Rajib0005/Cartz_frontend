import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from './components/Product/ProductDetails.js'
import LoginSignup from "./components/User/LoginSignup";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import {loadUser} from "./actions/userAction";
import store from "./store";
import WebFont from "webfontloader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.js"
function App() {
  const {user,isAuthenticated } = useSelector(
    (state) => state.user
  );
  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route  exact path='/' element={<Home />} />
        <Route  exact path='/products/:id' element={<ProductDetails />} />
        <Route  exact path='/products' element={<Products />} />
        <Route  exact path='/search' element={<Search />} />
        <Route  exact path='/login' element={<LoginSignup />} />
        <Route  path='/products/:keyword' element={<Products />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
