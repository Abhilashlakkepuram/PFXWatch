import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { Audio } from "react-loader-spinner";
// Update import paths based on your file structure
import Header from '../Header/Header'
import HomeVideos from '../videos/videos';
import VideoCard from '../gameVideocard/gamevideocard';
import './index.css'



const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Home = () => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [bannerDisplay, setBannerDisplay] = useState('flex');

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.videos.map((eachVideo) => ({
          id: eachVideo.id,
          title: eachVideo.title,
          thumbnailUrl: eachVideo.thumbnail_url,
          viewCount: eachVideo.view_count,
          publishedAt: eachVideo.published_at,
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        }));
        setHomeVideos(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onChangeInput = (event) => {
    setSearchInput(event.target.value);
  };

  const getSearchResults = () => {
    getVideos();
  };

  const onRetry = () => {
    setSearchInput('');
    getVideos();
  };

  const renderLoaderView = () => (
    <div className="profile-loader-container">
    <Audio
 height="50"
 width="50"
 radius="9"
 color="white"
 ariaLabel="loading"
 wrapperStyle
 wrapperClass
/>

   </div>
);

        return (
          <>
            <Header />

            <div data-testid="home">
              <div>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={onChangeInput}
                />
                <button data-testid="searchButton" onClick={getSearchResults}>
                  <AiOutlineSearch size={20} />
                </button>
                <div>title</div>
              </div>
              
            </div>
          </>
        );
      }



export default Home;
