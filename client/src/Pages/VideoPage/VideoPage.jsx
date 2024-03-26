import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import "./VideoPage.css";
import { addToHistory } from "../../actions/History";
import { viewVideo } from "../../actions/video";
import { subscribeToChannel, unsubscribeFromChannel } from "../../actions/auth"; // Import the subscribe and unsubscribe actions

function VideoPage() {
  const { vid } = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const vids = useSelector((state) => state.videoReducer);
  const vv = vids?.data?.filter((q) => q._id === vid)[0];
  const dispatch = useDispatch();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const handleHistory = () => {
    dispatch(
      addToHistory({
        videoId: vid,
        Viewer: CurrentUser?.result._id,
      })
    );
  };

  const handleViews = () => {
    dispatch(viewVideo({
      id: vid
    }));
  };

  useEffect(() => {
    if (CurrentUser) {
      handleHistory();
    }
    handleViews();
    const userIsSubscribed = CurrentUser?.result?.subscriberIds?.includes(vv?.videoChanel); /* Replace this with your logic to check if the user is subscribed */
    setIsSubscribed(userIsSubscribed);
  }, [CurrentUser]);

  const toggleSubscribeBtn = () => {
    if (!CurrentUser) {
      alert("Please login to subscribe");
      return;
    }
  
    const userId = CurrentUser?.result?._id;
    const channelId = vv?.videoChanel;
  
    if (!userId || !channelId) {
      console.error("Invalid user ID or channel ID");
      return;
    }
  
    const updatedIsSubscribed = !isSubscribed;
  
    if (updatedIsSubscribed) {
      dispatch(subscribeToChannel(userId, channelId))
        .then(() => {
          setIsSubscribed(updatedIsSubscribed);
        })
        .catch((error) => {
          console.error("Failed to subscribe:", error);
        });
    } else {
      dispatch(unsubscribeFromChannel(userId, channelId))
        .then(() => {
          setIsSubscribed(updatedIsSubscribed);
        })
        .catch((error) => {
          console.error("Failed to unsubscribe:", error);
        });
    }
  };
  
  

  return (
    <>
      <div className="container_videoPage">
        <div className="container2_videoPage">
          <div className="video_display_screen_videoPage">
            <video
              src={`http://localhost:5000/${vv?.filePath}`}
              className={"video_ShowVideo_videoPage"}
              controls
            ></video>
            <div className="video_details_videoPage">
              <div className="video_btns_title_VideoPage_cont">
                <p className="video_title_VideoPage">{vv?.videoTitle}</p>
                <div className="views_date_btns_VideoPage">
                  <div className="views_videoPage">
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                  </div>
                  <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                </div>
              </div>
              <div>
                <Link
                  to={`/chanel/${vv?.videoChanel}`}
                  className="chanel_details_videoPage"
                >
                  <b className="chanel_logo_videoPage">
                    <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                  </b>
                  <p className="chanel_name_videoPage">{vv?.Uploder}</p>
                </Link>
                <button className="susbtn" onClick={toggleSubscribeBtn}>
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              </div>
              <div className="comments_VideoPage">
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments videoId={vv._id} />
              </div>
            </div>
          </div>
          <div className="moreVideoBar">More video</div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;

