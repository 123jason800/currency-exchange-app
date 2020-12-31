import './css/App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Currencylist from './components/Currencylist';
import Basecurrency from './components/Basecurrency';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div>
      <Navbar />  
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Currencylist" component={Currencylist} />  
        <Route path="/BaseCurrency/:id" component={Basecurrency} />  
      </Switch>
    
    </div>
    </Router>
  );
}

export default App;
