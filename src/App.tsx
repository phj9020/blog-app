import React from 'react';
import TopBar from './components/TopBar';
import './reset.css';
import Home from './routes/Home';
import Setting from './routes/Setting';
import Single from './routes/Single';
import Write from './routes/Write';

function App() {
  return (
    <div>
        <TopBar />
        <Setting />
    </div>
  );
}

export default App;
