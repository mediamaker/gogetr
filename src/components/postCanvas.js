import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { render, Text, useApp, Stage, Sprite } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
// import Unsplash from 'unsplash-js';
 
const QUOTES_AUTH_TOKEN = "dCMlAV8KJo78QHWt5B5YugeF";
// const imageURL = 'https://picsum.photos/800/800'
const imageURL =  "https://api.unsplash.com/photos/random/?client_id=81a8941ee89933005e14ec94eff0c572a97bd369869025f90a2e3b7f59fb1619"

function PostCanvas() {
  const [data, setQuote] = useState({
    quote: "Getting some good juju going..."
    
  });
  const [returnedImage, setImage] = useState({});
  const [textStyle, setTextStyle] = useState({});
  let loader = new PIXI.loaders.Loader();
  loader.add('mySprite', imageURL);
  loader.load((loader, resources) => {
    console.log(loader);
});
  useEffect(() => {
    fetchQuote();
  }, []);
  useEffect(() => {
    fetchTextStyle();
  }, []);
  useEffect(() => {
    fetchImage();
  }, [loader.resources.mySprite.url]);

  const fetchTextStyle = async () => {
    const style = new PIXI.TextStyle({
      fill: "#fcfbfd",
      fontStyle: "italic",
      fontVariant: "small-caps",
      fontWeight: "bold",
      letterSpacing: 2,
      lineHeight: 60,
      stroke: "#707070",
      strokeThickness: 2,
      wordWrap: true,
      wordWrapWidth: 600
    });
    setTextStyle(style);
  };

  const fetchQuote = async () => {
    let result = await axios({
      url: "http://quotes.rest/quote/random.json",
      headers: {
        "x-theysaidso-api-secret": QUOTES_AUTH_TOKEN
      }
    });
    console.log('quote result:' + result.data.contents);
    setQuote(result.data.contents.quote);
  };

  const fetchImage = async () => {
    const imageResult = await axios({
      url:
        imageURL
    });
    console.log(imageResult.data.urls.regular)
    loader.reset()
    loader.add('mySprite', imageResult.data.urls.regular);
    // loader.resources.mySprite.url = imageResult.data.urls.regular
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Stage>
          <Suspense fallback={<div>Loading...</div>}>
            <Sprite image={loader.resources.mySprite.url} scale={1} />
            <Text text={data} style={textStyle} x={50} y={50} />
          </Suspense>
        </Stage>
      </Suspense>
      <button onClick={e => fetchQuote()}>Change Quote</button>
      <button onClick={e => fetchImage()}>Change Image</button>
    </>
  );
}
export default PostCanvas;
