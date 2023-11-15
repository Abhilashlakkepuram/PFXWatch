import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import './index.css'
import Cookies from "js-cookie";

import VideoComponent from "../VideoComponent/VideoComponent";
import VideoList from "../VideoList/videoList";


const Home =()=>{

    let navigate = useNavigate();
    

    useEffect(()=>{
        const token = Cookies.get('jwt_token');
        if(token === undefined){
            navigate("/auth")
         }
    })
    

    
    return(
        <>
            <Header />   
            <div className="home-container">
                <h1>PFX Watch</h1>
                
               <VideoList/>
            </div>
        </>
    )
    }
// }

export default Home;