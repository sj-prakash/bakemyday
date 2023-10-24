import React from "react";
import {BrowserRouter as Router , Route, Routes, useLocation} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from 'react-bootstrap'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from './screens/CartScreen'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";



function App() {


  return (

      <Router>
      
      <Header  />
      
        <main className="py-3">
          <Container>
          <Routes>
            <Route path="/" Component={HomeScreen} exact/>
            <Route path='/cart/:id?' Component={CartScreen}/> 
            <Route path='/register' Component={RegisterScreen}></Route> 
            <Route path='/profile' Component={ProfileScreen}></Route> 
            <Route path="/product/:id" Component={ProductScreen} />
            <Route path="/shipping" Component={ShippingScreen}/>
            <Route path="/payment" Component={PaymentScreen}/>
            <Route path="/placeorder" Component={PlaceOrderScreen}/>
            <Route path="/order/:id" Component={OrderScreen}/>

            
            <Route path="/login" Component={LoginScreen} exact/>

            
          </Routes>

            
          
          </Container>
        
        </main>
      
      
      
      <Footer/>

      </Router>
  );
}

export default App;