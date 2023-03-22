import React from "react";
import './App.css';
import Meme from "./component/Meme";
import Header from "./component/Header";

const App = () => { 
  return (
    <div className="meme-container">
      <Header />
      <Meme />
    </div>
  )
};

export default App;
