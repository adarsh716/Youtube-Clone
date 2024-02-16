import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineLike,
  } from "react-icons/ai";
  
  import { MdPlaylistAddCheck } from "react-icons/md";
  import {
    RiHeartAddFill,
    RiPlayListAddFill,
    RiShareForwardLine,
  } from "react-icons/ri";
  import "./LikeWatchLaterSaveBtns.css";
function LikeWatchLaterSaveBtns() {
    const [SAveVideo, setSAveVideo] = useState(false);
    const [DislikeBtn, setDislikeBtn] = useState(false);
  const [LikeBtn, setLikeBtn] = useState(false);

  const toggleSavedVideo = () => {
    //if (CurrentUser) {
      if (SAveVideo) {
        setSAveVideo(false);
        // dispatch(
        //   deleteWatchLater({
        //     videoId: vid,
        //     Viewer: CurrentUser?.result._id,
        //   })
        // );
      } else {
        setSAveVideo(true);
        // dispatch(
        //   addTowatchLater({
        //     videoId: vid,
        //     Viewer: CurrentUser?.result._id,
        //   })
        // );
      }
    // } else {
    //   alert("Plz Login To save the video !");
    // }
  };

  const toggleLikeBtn = (e, lk) => {
    //if (CurrentUser) {
      if (LikeBtn) {
        setLikeBtn(false);
        // dispatch(
        //   likeVideo({
        //     id: vid,
        //     Like: lk - 1,
        //   })
        // );
        // dispatch(deletelikedVideo({
        //   videoId: vid,
        //   Viewer: CurrentUser?.result._id,
        // }))
      } else {
        setLikeBtn(true);
        // // dispatch(
        // //   likeVideo({
        // //     id: vid,
        // //     Like: lk + 1,
        // //   })
        // );
        // dispatch(
        //   addTolikedVideo({
        //     videoId: vid,
        //     Viewer: CurrentUser?.result._id,
        //   })
        // );
        // setDislikeBtn(false);
      }
    // } else {
    //   alert("Plz Login To give a like");
    // }
  };

  const toggleDislikeBtn = (e, lk) => {
    //if (CurrentUser) {
      if (DislikeBtn) {
        setDislikeBtn(false);
      } else {
       setDislikeBtn(true);
    //     if (LikeBtn) {
    //       dispatch(
    //         likeVideo({
    //           id: vid,
    //           Like: lk - 1,
    //         })
    //       );
    //       dispatch(deletelikedVideo({
    //         videoId: vid,
    //         Viewer: CurrentUser?.result._id,
    //       }))
    //     }
    //     setLikeBtn(false);
      }
    // } else {
    //   alert("Plz Login To give a like");
    // }
  };
  return (
    <div className="btns_cont_videoPage">
      <div className="btn_VideoPage">
        <BsThreeDots />
      </div>

      <div className="btn_VideoPage">
        <div
          className="like_videoPage"
          //onClick={(e) => toggleLikeBtn(e,vv.Like)}
          onClick={() => toggleLikeBtn()}
        >
          {LikeBtn ? (
            <>
              <AiFillLike size={22} className="btns_videoPage" />
            </>
          ) : (
            <> 
              <AiOutlineLike size={22} className="btns_videoPage" />
            </>
          )}
          <b>
            1k
            {/* {vv.Like} */}
            </b>
        </div>
        <div
          className="like_videoPage"
         // onClick={(e) => toggleDislikeBtn(e, vv.Like)}
         onClick={() => toggleDislikeBtn()}
        >
          {DislikeBtn ? (
            <>
              <AiFillDislike size={22} className="btns_videoPage" />
            </>
          ) : (
            <>
              <AiOutlineDislike size={22} className="btns_videoPage" />
            </>
          )}
          <b>DISLIKE</b>
        </div>
        <div className="like_videoPage"
         onClick={() => toggleSavedVideo()}
         >
          {SAveVideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_videoPage" />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_videoPage" />
              <b>Save</b>
            </>
          )}
        </div>
        <div className="like_videoPage">
          <>
            <RiHeartAddFill size={22} className="btns_videoPage" />
            <b>Thanks</b>
          </>
        </div>
        <div className="like_videoPage">
          <>
            <RiShareForwardLine size={22} className="btns_videoPage" />
            <b>Share</b>
          </>
        </div>
      </div>
    </div>
  );
}

export default LikeWatchLaterSaveBtns;
