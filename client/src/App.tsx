import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Auth from "./pages/Auth";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Auth} path={["/login", "/signup"]} />
          <Route exact component={Counter} path="/counter" />
          {/* Redirect all invalid paths to home */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
