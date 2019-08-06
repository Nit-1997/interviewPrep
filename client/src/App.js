import React from 'react';
import Header from './components/header';
import Image from './components/image';
import './App.css';
import {Container,Button} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Header/>
      <header className="App-header">
        <Image/>
      </header>
    </div>
  );
}

export default App;
