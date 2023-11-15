import React, { useState } from 'react';
import Cookies from "js-cookie";

import "./index.css"

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


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
      console.log(data)
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
    
  };
   

  const fetchVideos = async (category) => {
    setLoading(true);
    setError(null);
    try {
      let url = 'api/videos'; // Default endpoint for all videos
      if (category === 'trending') {
        url = 'http://localhost:6600/api/videos/trending'; // Endpoint for trending videos
      } else if (category === 'game') {
        url = 'http://localhost:6600/api/videos/game'; // Endpoint for game videos
      }

      const response = await fetch(url); // Replace with your backend URL
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const videoData = await response.json();
      setVideos(videoData);
      console.log(videoData)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.'); // Update state with error message
      setLoading(false);
      // Handle errors here
    }
  };

  return (
    <div>
      <h1>List of Videos</h1>

      <div className="responsive-container">
                    
        <button type="button" className="find-jobs " onClick={fetchAllVideos}>Home</button>             
                   
        <button type="button" className="find-jobs "  onClick={() => fetchVideos('trending')}>Trending</button>
                    
                  
        <button type="button" className="find-jobs " onClick={() => fetchVideos('game')}>Game</button>
                   
    </div>

      {error && <p>{error}</p>} {/* Display error message */}
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
                {/* <div className='container '>
                    <img src={video.thumbnail_url}/>
                    <h3>Title:{video.title}</h3>
                    <link>{video.video_url}</link>
                    <div className='col'>
                        <h2>{video.view_count}</h2>
                    </div>
                    <div className='col'>
                        <h2>{video.published_at}</h2>
                    </div>
                </div> */}


              {/* Render other video details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoList;
