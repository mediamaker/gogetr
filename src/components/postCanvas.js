import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { render, Text, useApp, Stage, Sprite } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
// import Unsplash from 'unsplash-js';

const QUOTES_AUTH_TOKEN = 'dCMlAV8KJo78QHWt5B5YugeF'
const client_id = '81a8941ee89933005e14ec94eff0c572a97bd369869025f90a2e3b7f59fb1619'

// const unsplash = new Unsplash({
//   headers: {
//     'applicationId': "81a8941ee89933005e14ec94eff0c572a97bd369869025f90a2e3b7f59fb1619",
//     'secret': "70281976ed3598af6c2866fc269dbf8f3b61248eafaef06c1151a69fecdb0d07",
//   }
// });

function PostCanvas() {
  const [data, setQuote] = useState({quote: 'Getting some good juju going...'})
  const [image, setImage] = useState({})
  const [textStyle, setTextStyle] = useState({})

useEffect( () => {
  fetchQuote();
  console.log('use effect')
}, [setQuote]);

useEffect( () => {
  fetchTextStyle();
  console.log('use effect')
}, [setTextStyle]);

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
  setTextStyle(style)
}

const fetchQuote = async () => {
  let result = await axios({
    url: 'http://quotes.rest/quote/random.json',
    headers: {
      'x-theysaidso-api-secret' : QUOTES_AUTH_TOKEN,
  }},
  );
  console.log(result.data.contents)
  setQuote(result.data.contents.quote)
  }

  //get an image  
  const fetchImage = async () => {
    const imageResult = await axios({
      url: 'https://api.unsplash.com/photos/random/?client_id=81a8941ee89933005e14ec94eff0c572a97bd369869025f90a2e3b7f59fb1619',
    });
    
    console.log(imageResult.data.links.html)
    setImage(new PIXI.Sprite.fromImage(imageResult.data.links.html)) 

    ;
  }
    useEffect( () => {
      fetchImage();
    }, []);
    
return (
  <>
  <Suspense fallback={<div>Loading...</div>}>
  <Stage>
    {/* <Sprite image={image} /> */}
    <Suspense fallback={<div>Loading...</div>}>
    <Text text={data} style={textStyle}  x={50} y={50 } />
    </Suspense>

  </Stage>
</Suspense>
<button onClick={(e) => fetchQuote()}>New Quote</button>
  </>
  


  )
}

export default PostCanvas;