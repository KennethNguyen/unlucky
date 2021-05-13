import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { persistUser } from "./features/user/userSlice";
import "./App.css";
import Auth from "./pages/Auth";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";

function App() {
  const dispatch = useAppDispatch();

  /* check if the user already has a valid local storage login session */
  useEffect(() => {
    dispatch(persistUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Auth} path={["/login", "/signup"]} />
          {/* Redirect all invalid paths to home */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
