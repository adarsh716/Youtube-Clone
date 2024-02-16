import React from 'react';
import { Link, useParams } from "react-router-dom";
import "./VideoPage.css";
import vid from '../../Components/Video/vid.mp4';
import Comments from '../../Components/Comments/Comments';
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns';
function VideoPage() {
  return (
    <>
    <div className="container_videoPage">
      <div className="container2_videoPage">
         <div className="video_display_screen_videoPage">
          <video
          src={vid}
            // src={`http://localhost:5500/${vv?.filePath}`}
            //src={`https://youtubeclone5031.herokuapp.com/${vv?.filePath}`}
            className={"video_ShowVideo_videoPage"}
            controls
            // autoPlay
          ></video>
          <div className="video_details_videoPage">
            <div className="video_btns_title_VideoPage_cont">
              <p className="video_title_VideoPage">Title</p>
              <div className="views_date_btns_VideoPage">
                <div className="views_videoPage">
                 10 views <div className="dot"></div>upload 1 year ago
                </div>
                <LikeWatchLaterSaveBtns
                //  vv={vv}
                  vid={vid} />
              </div>
            </div>
            <Link
              // to={`/chanel/${vv?.videoChanel}`}
              className="chanel_details_videoPage"
            >
              <b className="chanel_logo_videoPage">
                <p>
                  {/* {vv?.Uploder.charAt(0).toUpperCase()} */}
                  G
                  </p>
              </b>
              <p className="chanel_name_videoPage">
                {/* {vv?.Uploder} */}
                Gaganpreet Kaur
                </p>
            </Link>
            <div className="comments_VideoPage">
              <h2>
                <u>Comments</u>
              </h2>
              <Comments 
               //videoId={vv._id}
               />
            </div>
          </div>
        </div> 
        <div className="moreVideoBar">More video</div>
      </div>
    </div>
  </>
  )
}

export default VideoPage