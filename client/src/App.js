import './App.css';
import Videogames from './components/videogames.jsx'
import SearchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <Videogames/>
    </div>
  );
}

export default App;