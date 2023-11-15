import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Audio } from "react-loader-spinner";
import Cookies from "js-cookie";
import './index.css';


const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};




const VideoProfileSection = () => {
  const [video, setJobs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const videoCard = props =>{
    const {videoDetails} = props;
    const {video_url,thumbnail_url,description,view_count,published_at,channel,title, _id} = videoDetails;

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);

    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:6600/api/filtervideos?title=${title.join()}&search=${searchInput}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        setJobs(data);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (e) {
      console.log(e);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      getVideoDetails();
    }
  };

  const renderVideoDetails = () => {
    const videoDisplay = video.length > 0;

    return videoDisplay ? (
      <div className="details-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyDown={onKeyDown}
            value={searchInput}
          />
          <button
            type="button"
            className="search-button"
            onClick={getVideoDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="job-details-item-container">
          {video.map((eachvideo) => (
            <videoCard key={eachvideo.id} videoDetails={eachvideo} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-video-container">
        <div className="search-input">
          <input
            type="search"
            className="search"
            placeholder="Search"
            onChange={onChangeSearchInput}
            onKeyDown={onKeyDown}
          />
          <button
            type="button"
            className="search-button"
            onClick={getVideoDetails}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-video-img.png "
          className="no-video"
          alt="no video found"
        />
        <h1 className="no-video-heading">No Jobs Found</h1>
        <p className="no-video-desc">
          We Could not found any video. Try other filters.
        </p>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      alt="failure view"
      className="failure-view"
    />
    <h1 className="failure-heading">Ooops something went wrong</h1>
    <p className="failure-desc">
      we cannot find the page you are looking for.
    </p>
    <button
      type="button"
      className="video-failure-button"
      onClick={getVideoDetails}
    >
      Retry
    </button>
    </div>
  );

  const renderLoaderView = () => (
     <div className="profile-loader-container">
     <Audio
  height="50"
  width="50"
  radius="5"
  color="white"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>

    </div>
);
 

  const renderJobPfrofileSection=()=>{
    switch(apiStatus){
        case apiStatusConstants.success:
            return renderVideoDetails();
        case apiStatusConstants.failure:
            return renderFailureView();
        case apiStatusConstants.inProgress:
            return renderLoaderView();
        default:
            return null;
    }
  }


  console.log(title)

  return (
    <div className="job-details-container">
       <div>{title}</div> 
       <div>{published_at}</div> 
       <div>{channel}</div> 
        
       
    </div>
  );
  }
 
};

export default VideoProfileSection;