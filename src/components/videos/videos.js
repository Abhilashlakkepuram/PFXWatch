import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Cookies from "js-cookie";
import './index.css'

const Videos =()=>{
    let navigate = useNavigate()

    useEffect(()=>{
        const token = Cookies.get('jwt_token');
        if(token === undefined){
            navigate("/auth")
         }
    })

    const videoCard = props =>{
        const {videoDetails} = props;
        const {video_url,thumbnail_url,description,view_count,published_at,channel,title, _id} = videoDetails;
        console.log(videoDetails);
    return(
        <>
            <Header/>
            <div className="video-profile-container">
            {title}
             heloooo
            </div>
        </>
    )
    }
}

export default Videos;