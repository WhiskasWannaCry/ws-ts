import React from 'react';
import './App.css';
import {user} from './types'
import Header from './components/Header';

function App() {
  const USERS: user[] = [
    {
      name:"Karim",
      age: 24,
    },
    {
      name:"Ilias",
      age: 22,
    },
  ] 
  return (
    <div className="App">
      <Header backgroundColor='red'></Header>
    </div>
  );
}

export default App;
