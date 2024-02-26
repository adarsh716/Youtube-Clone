import React from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid";
import "./yourVideo.css";
function YourVideo() {

  

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videoChanel === CurrentUser?.result?._id).reverse();
  
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="container_yourvideo">
          <h1>Your Video</h1>
          {
            CurrentUser ?(<>
          <ShowVideoGrid vids={vids} />
            </>):<>
            <h3>Plz Login to see Your uploded video list</h3></>
          }
        </div>
      </div>
    </div>
  );
}

export default YourVideo;