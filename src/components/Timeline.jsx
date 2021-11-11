import { useEffect, useState } from 'react';
import axios from 'axios';


const Timeline = () => {

  useEffect(() => {
    const gitHubUserName = "sjngplus";
    const url = `https://api.github.com/users/${gitHubUserName}/repos`;

    axios.get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }, [])



  return (
    <div>
      Test
    </div>
  )
}

export default Timeline;