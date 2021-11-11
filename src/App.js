import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/homepage/home/Home";
import FirebaseContext from "./contexts/FirebaseContext";
import Explore from "./pages/explore/Explore";
import BuyNow from "./pages/buynow/BuyNow";
import Login from "./pages/login/Login";
import PrivateRoute from "./Routes/PrivateRoute";

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
        </Switch>
      </Router>
    </FirebaseContext>
  );
}

export default App;
