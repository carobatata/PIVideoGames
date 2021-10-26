import { Route, Switch } from 'react-router';
import './App.css';
import Videogames from './components/videogames';
import SearchBar from './components/searchBar';
import Order from './components/order';
import VideogameDetail from './components/videogameDetail';
import AddVideogame from './components/addVideogame';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Switch>
        <Route exact path='/'> 
          <Order />
          <Videogames/>
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