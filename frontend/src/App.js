import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Components/Home/HomePage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes variant='dark'>
        <Route path='/' Component={HomePage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
