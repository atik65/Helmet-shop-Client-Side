import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/homepage/home/Home";
import FirebaseContext from "./contexts/FirebaseContext";
import Explore from "./pages/explore/Explore";
import BuyNow from "./pages/buynow/BuyNow";
import Login from "./pages/login/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import DashboardContainer from "./pages/dashboard/dashboardContainer/DashboardContainer";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Error from "./pages/error/Error";
import Paymnet from "./pages/payment/Paymnet";
import PaymentSucces from "./pages/paymentSuccess/PaymentSucces";

function App() {
  return (
    <FirebaseContext>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/buynow/:id">
            <BuyNow />
          </PrivateRoute>

          <PrivateRoute path="/placeorder/:id">
            <PlaceOrder />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <DashboardContainer />
          </PrivateRoute>
          <Route exact path="/payment/:id" component={Paymnet} />
          <Route path="/payment/success/:id" component={PaymentSucces} />

          <Route component={Error} />
        </Switch>
      </Router>
    </FirebaseContext>
  );
}

export default App;
