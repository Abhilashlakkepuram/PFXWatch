
import { Link } from 'react-router-dom';


import './index.css'

const VideoCard = props =>{
    const {videoDetails} = props;
    const {title,thumbnail_url,view_count,published_at,category,description,_id} = videoDetails
    return(
        <Link className='link-item' to={`/videos`}>
            <li className='job-list-items'>
            <div className='company-container'>
                <div>
                    <img src={thumbnail_url} alt="videi logo" className='logo-url'/>
                </div>
                <div>
                    <h1 className='company-title'>{title}</h1>
                    <h1>{thumbnail_url}</h1>
                </div>
            </div>
        </li>
        </Link>
        
    )
}

export default VideoCard;