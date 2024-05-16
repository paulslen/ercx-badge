import React from 'react';
import logo from './logo.svg';
import './App.css';
import TokenScore from './components/TokenScore'; // Import the component

function App() {
  return (
    <div>
        <TokenScore tokenAddress="0xdAC17F958D2ee523a2206206994597C13D831ec7" networkId={1} /> {/* Include your token address and network ID */}
    </div>
  );
}

export default App;
