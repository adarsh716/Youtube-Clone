import React from 'react'
import WHL from '../../Components/WHL/WHL';
import { useSelector } from 'react-redux';
import vid from "../../Components/Video/vid.mp4";
function WatchHistory() {
  const historyList= useSelector(state=>state.HistoryReducer)
  return (
    <WHL page={"History"} videoList={historyList}/>
  )
}

export default WatchHistory