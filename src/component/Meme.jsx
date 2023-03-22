import React from "react";
import { useState, useEffect, useRef } from "react";
import Draggable from 'react-draggable';
import domtoimage from 'dom-to-image';

const Main = () => {
  const memeWidth = 600;
  const memeHeight = 600;
  const [topPosition, setTopPosition] = useState({ x: -50, y: 60 });
  const [bottomPosition, setBottomPosition] = useState({x:-50, y:-60})
  const [allMemes, setAllMemes] = useState([])
  const [meme, setMeme] = useState({
    topText: "Shut Up",
    bottomText: "And Take My Money",
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

  const handleTopPosition = (event, data) => {
    setTopPosition({ x: data.x, y: data.y });
  }

  const handleBottomPosition = (event, data) => {
    setBottomPosition({ x: data.x, y: data.y });
  }

  const handleDownload = () => {
    const memeImgContainer = document.getElementById('memeImg-container');
    const downloadButton = memeImgContainer.querySelector('.download--button');
    downloadButton.style.display = 'none';
    domtoimage.toPng(memeImgContainer)
      .then((dataUrl) => {
        downloadButton.style.display = 'block'
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Error while downloading meme:', error);
      });
  };

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
      
        <button className="form--button col-span-2 text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 focus:outline-none" onClick={getRandomImg}>Get a new meme image  🖼</button>
      </div>

      <div id="memeImg-container" className="relative text-3xl text-white text-center">
        <img src={meme.randomImg} alt="" className="w-full rounded mt-5"/>
        <Draggable
          position={topPosition}
          bounds="parent"
          onStop={handleTopPosition}
        >
            <span className="meme--text font-impact absolute left-1/3 top-4 cursor-grab">{meme.topText}</span>
          </Draggable>
        <Draggable
          position={bottomPosition}
          bounds="parent"
          onStop={handleBottomPosition}
        >
            <span className="meme--text font-impact absolute left-1/3 bottom-4 cursor-grab">{meme.bottomText}</span>
        </Draggable>
        
        <div className="absolute bottom-4 right-4">
          <button onClick={handleDownload} className="download--button bg-rose-600 font-semibold p-2 text-sm rounded-md">Download Meme</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
