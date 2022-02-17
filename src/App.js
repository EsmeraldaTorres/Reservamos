import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Header from './Components/Home/Custom/Header';
function App() {
  return (
    <div className="App">
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
