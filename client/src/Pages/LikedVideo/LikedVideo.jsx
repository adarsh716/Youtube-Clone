
import React from 'react'
import { useSelector } from 'react-redux';
import WHL from '../../Components/WHL/WHL';

function LikedVideo() {
  const likedVideoList= useSelector(state=>state.likedVideoReducer)
  
  return (
    <WHL page={"Liked Video"} videoList={likedVideoList}/>
  )
}
export default LikedVideo
