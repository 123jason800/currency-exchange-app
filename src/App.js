import './css/App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
            <Route path="/base/:id" component={Basecurrency} />  
          </Switch>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
