import React from 'react';
import TopBar from './components/TopBar';
import './reset.css';
import Home from './routes/Home';

function App() {
  return (
    <div>
        <TopBar />
        <Home />
    </div>
  );
}

export default App;
