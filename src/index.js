import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js'
import './fonts/InriaSerif-Regular.ttf';
import './fonts/InriaSerif-Bold.ttf';
import './fonts/InriaSerif-Light.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignContent:"center"}}>
    <App />
  </div>,
)