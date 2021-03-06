import { Route, Switch } from 'react-router';
import './App.css';
import Home from './components/Home/Home';
import VideogameDetail from './components/VideogameDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import LandingPage from './components/Landing/LandingPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'> 
          <LandingPage/>
        </Route> 
        <Route exact path='/home'> 
          <Home/>
        </Route> 
        <Route exact path='/createVideogame'> 
          <CreateVideogame/>
        </Route> 
        <Route path='/:id'> 
          <VideogameDetail/>
        </Route> 
      </Switch>
    </div>
  );
}

export default App;