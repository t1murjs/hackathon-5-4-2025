import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './Components/Home/HomePage.jsx';
import LoginPage from './Components/Login/LoginPage.jsx';
import RegisterPage from './Components/Register/RegisterPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes variant='dark'>
        <Route path='/' Component={HomePage}/>
        <Route path='/login' Component={LoginPage}/>
        <Route path='/register' Component={RegisterPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
