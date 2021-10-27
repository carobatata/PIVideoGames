import { Route, Switch } from 'react-router';
import './App.css';
import Home from './components/Home';
import SearchBar from './components/SearchBar';
import VideogameDetail from './components/VideogameDetail';
import AddVideogame from './components/AddVideogame';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Switch>
        <Route exact path='/'> 
          <LandingPage/>
        </Route> 
        <Route exact path='/home'> 
          <Home/>
        </Route> 
        <Route exact path='/addVideogame'> 
          <AddVideogame/>
        </Route> 
        <Route path='/:id'> 
          <VideogameDetail/>
        </Route> 
      </Switch>
    </div>
  );
}

export default App;