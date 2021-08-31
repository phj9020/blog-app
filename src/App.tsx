import React from 'react';
import TopBar from './components/TopBar';
import './reset.css';
import Home from './routes/Home';
import Single from './routes/Single';

function App() {
  return (
    <div>
        <TopBar />
        <Single />
    </div>
  );
}

export default App;
