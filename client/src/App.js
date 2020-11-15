import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Components/Main';
import Info from './Components/Info';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Session from './Components/Session';
import Registration from './Components/Registration';
import Login from './Components/Login';

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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path='/payload' component={() => { 
          window.location.href = 'https://qr.nspk.ru/AD9544F7A25A413086E343978307600A?type=02&bank=10000001&sum=425000&cur=RUB&crc=C08B'; 
          return null;
          }}/>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
