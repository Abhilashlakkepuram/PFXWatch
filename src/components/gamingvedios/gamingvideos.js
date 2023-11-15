import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import Loader from 'react-loader-spinner';
import { SiYoutubegaming } from 'react-icons/si';
import Header from '../Header';
import NavigationBar from '../NavigationBar';
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext';
import FailureView from '../FailureView';
import GameVideoCard from '../GameVideoCard';


import {
  GamingContainer,
  GamingTitleIconContainer,
  GamingVideoTitle,
  GamingVideoList,
  GamingText,
  LoaderContainer,
} from './styledComponents';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const GamingVideos = () => {
  const [gamingVideos, setGamingVideos] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const url = `https://localhost:6600/api/videos/gaming`;
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
        }));
        setGamingVideos(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderLoadingView = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </LoaderContainer>
  );

  const renderVideosView = () => (
    <GamingVideoList>
      {gamingVideos.map((eachVideo) => (
        <GameVideoCard key={eachVideo.id} videoDetails={eachVideo} />
      ))}
    </GamingVideoList>
  );

  const onRetry = () => {
    getVideos();
  };

  const renderFailureView = () => <FailureView onRetry={onRetry} />;

  const renderTrendingVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <ThemeAndVideoContext.Consumer>
      {(value) => {
        const { isDarkTheme } = value;

        const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9';
        const textColor = isDarkTheme ? '#f9f9f9' : '#231f20';

        return (
          <div>
            <Header />
            <NavigationBar />
            <GamingContainer data-testid="gaming" bgColor={bgColor}>
              <GamingVideoTitle>
                <GamingTitleIconContainer>
                  <SiYoutubegaming size={35} color="#ff0000" />
                </GamingTitleIconContainer>
                <GamingText color={textColor}>Gaming</GamingText>
              </GamingVideoTitle>
              {renderTrendingVideos()}
            </GamingContainer>
          </div>
        );
      }}
    </ThemeAndVideoContext.Consumer>
  );
};

export default GamingVideos;
