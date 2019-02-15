import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostCanvas() {

const [data, setQuote] = useState({ })

const fetchQuote = async () => {
  const result = await axios(
    'http://quotes.rest/qod.json',
  );
  setQuote(result.data.contents);
  console.log(result.data.contents);
}

useEffect( () => {
  fetchQuote();
}, []);

return (
<div>{data.quotes.map(item =>
<div>{item.quote}</div>
  )}
  </div>
    )}
export default PostCanvas;