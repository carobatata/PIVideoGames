import './App.css';
import Videogames from './components/videogames.jsx'
import SearchBar from './components/searchBar';
import Order from './components/order'

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Order />
      <Videogames/>
    </div>
  );
}

export default App;