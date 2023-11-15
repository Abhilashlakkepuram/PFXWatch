import Cookies from "js-cookie";
import React, { useState } from 'react';

const VideoComponent = () => {
  const [videos, setVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [gameVideos, setGameVideos] = useState([]);


  
  const jwtToken = Cookies.get("jwt_token");
  const fetchAllVideos = async () => {
   
  const options = {
    headers: {
        Authorization: `Bearer ${jwtToken}`,
    },
    method: "GET",
  };
    try {
      const response = await fetch("http://localhost:6600/api/videos" ,options); 
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const fetchTrendingVideos = async () => {
    const options = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };
    try {
      const response = await fetch('http://localhost:6600/api/videos/trending',options); 
      const data = await response.json();
      setTrendingVideos(data);
    } catch (error) {
      console.error('Error fetching trending videos:', error);
    }
  };

  const fetchGameVideos = async () => {
      const options = {
    headers: {
        Authorization: `Bearer ${jwtToken}`,
    },
    method: "GET",
  };
    try {
      const response = await fetch('http://localhost:6600/api/videos/game',options); 
      const data = await response.json();
      setGameVideos(data);
    } catch (error) {
      console.error('Error fetching game videos:', error);
    }
  };

  return (
    <div>
       <div className="responsive-container">
                    
                    <button type="button" className="find-jobs " onClick={fetchAllVideos}>Home</button>
                    
                   
                    <button type="button" className="find-jobs " onClick={fetchTrendingVideos}>Trending</button>
                    
                  
                    <button type="button" className="find-jobs " onClick={fetchGameVideos}>Game</button>
                   
                </div>

     
      <ul>
        {videos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>

     
      <ul>
        {trendingVideos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>

     
      <ul>
        {gameVideos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default VideoComponent;
