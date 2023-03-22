import React from "react";
import logo from "/images/troll-face.png"

const Nav = () => {
  return (
    <nav className="flex items-center p-4 bg-rose-700 text-white rounded">
      <img src={logo} alt="" className="h-[40px]"/>
      <h1 className="text-2xl ml-2">Meme Generator</h1>
      <p className="ml-auto">React - My Very First Project</p>
    </nav>
  );
};

export default Nav;
