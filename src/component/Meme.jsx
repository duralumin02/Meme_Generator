import React from "react";
import { useState, useEffect } from "react";

const Main = () => {
  const [allMemes, setAllMemes] = useState([])
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImg: "https://i.imgflip.com/30b1gx.jpg"
  })

  useEffect(() => {
     fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  }, [])
  
  const getRandomImg = () => {
    const randomIndex = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomIndex].url
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImg: url
    }))
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name] : value
    }))
  }


  return (
    <div className="p-14">
      <div className="grid grid-cols-2 gap-4">
        <input type="text"
          placeholder="Top Text ..."
          className="border border-gray-300 outline-rose-600 rounded p-2"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input type="text"
          placeholder="Bottom Text ..."
          className="border border-gray-300 outline-rose-600 rounded p-2"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
      
        <button class="form--button col-span-2 text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none" onClick={getRandomImg}>Get a new meme image  🖼</button>
      </div>
      <div className="relative text-5xl font-impact text-white">
        <span className="meme--text absolute top-4">{meme.topText}</span>
        <img src={meme.randomImg} alt="" className="w-full rounded mt-5"/>
        <span className="meme--text absolute bottom-4">{meme.bottomText}</span>
      </div>
    </div>
  );
};

export default Main;
