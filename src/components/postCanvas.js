import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { render, Text, useApp, Stage, Sprite } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import { stringify } from "querystring";
// import { FILE } from "dns";
// import Unsplash from 'unsplash-js';
 
const QUOTES_AUTH_TOKEN = "dCMlAV8KJo78QHWt5B5YugeF";
// const imageURL = 'https://picsum.photos/800/800'
const imageURL =  "https://api.unsplash.com/photos/random/?client_id=81a8941ee89933005e14ec94eff0c572a97bd369869025f90a2e3b7f59fb1619"
const quoteURL =  'http://quotes.rest/quote/random?&category=inspirational'
// const quoteURL =  'http://quotes.rest/quote/random.json'

function PostCanvas() {
  const [data, setQuote] = useState({
    quote: "Getting some good juju going..."
  });
  const [returnedImage, setImage] = useState('loading');
  const [textStyle, setTextStyle] = useState({});
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    useQuote();
  }, []);
  useEffect(() => {
    useTextStyle();
  }, []);
  useEffect(() => {
    fetchImage();
  }, []);
  useEffect(() => {
    fetchFilters();
  }, []);

  const useTextStyle = async () => {
    const style = new PIXI.TextStyle({
      fill: "#fcfbfd",
      fontStyle: "italic",
      fontSize: 52,
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

  const useQuote = async () => {
    let result = await axios({
      url: quoteURL,
      headers: {
        "x-theysaidso-api-secret": QUOTES_AUTH_TOKEN
      }
    });
    console.log(result);
    setQuote(result.data.contents.quote);
  };
  
  const fetchImage = async () => {
    const imageResult = await axios({
      url:
        imageURL
    });

    console.log(imageResult.data.urls.regular)
    // setImage(localImage)
    setImage(imageResult.data.urls.regular)

  };

  const fetchFilters = () => {
    const filter = new PIXI.filters.ColorMatrixFilter()
    filter.brightness(.3)
    setFilters([filter])
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Stage> 
          <Suspense fallback={<div>Loading...</div>}>
            <Sprite filters={filters} image={returnedImage} scale={1} />
            <Text text={data} style={textStyle} x={50} y={50} />
          </Suspense>
        </Stage>
      </Suspense>
      <button onClick={e => useQuote()}>Change Quote</button>
      <button onClick={e => fetchImage()}>Change Image</button>
    </>
  );
}
export default PostCanvas;
