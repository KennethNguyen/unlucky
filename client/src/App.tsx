import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import './App.css';
import AuthDisplay from './pages/AuthDisplay';
import NavBar from './components/NavBar/NavBar';
import ContentDisplay from './pages/ContentDisplay';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact component={ContentDisplay} path="/" />
          <Route exact component={AuthDisplay} path="/auth" />
          <Route exact component={Counter} path="/counter" />
          {/* Redirect all invalid paths to home */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
