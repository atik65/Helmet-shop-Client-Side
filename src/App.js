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
        </Switch>
      </Router>
    </FirebaseContext>
  );
}

export default App;
