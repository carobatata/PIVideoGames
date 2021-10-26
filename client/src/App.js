import { Route, Switch } from 'react-router';
import './App.css';
import Videogames from './components/videogames.jsx'
import SearchBar from './components/searchBar';
import Order from './components/order'
import VideogameDetail from './components/videogameDetail.jsx';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Switch>
        <Route exact path='/'> 
          <Order />
          <Videogames/>
        </Route> 
        <Route path='/:id'> 
          <VideogameDetail/>
        </Route> 
      </Switch>
    </div>
  );
}

export default App;