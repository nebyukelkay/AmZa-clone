import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";
import Result from "./Pages/Result/Result";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PK17A04tOSNhfKuuusB51BxOgpdss71MKf0i2NYLvD346mKIkSrCGMDmLaTxpYOlNca31siCypIQ2P1dCF4fdaq001Vs3iU53"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payments" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />
        <Route path="/order" element={<Orders />} />
        <Route path="/category/:CategoryName" element={<Result />} />
        <Route path="/Products/:ProductId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;