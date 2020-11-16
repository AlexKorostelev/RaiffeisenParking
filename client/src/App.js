import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Main} from './Components/Main';
import Info from './Components/Info';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Session from './Components/Session';
import Registration from './Components/Registration';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/session/:carNumber/info">
          <Session />
        </Route>
        <Route exact path="/info">
          <Info />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
