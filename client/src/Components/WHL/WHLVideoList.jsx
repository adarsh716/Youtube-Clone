import React from 'react'
import ShwoVideoList from '../ShowVideoList/ShowVideoList'

function WHLVideoList({ page,videoList }) {
  // console.log(videoList)
  return (
    <>
      {/* { CurrentUser ?(<> */}
     {
            // ?.data?.filter(q=>q?.Viewer === CurrentUser).reverse()
              videoList.map(m=>{
                return(
                    <>
                    <ShwoVideoList videoId={m._id} key={m._id}
                    //videoId={m?.videoId} key={m?._id}
                    />
                    </>
    
                )
            })
     }
      {/* </>) :(<> 
      <h2 style={{color:"white"}}>Plz Login To Watch Your {page} </h2>
      </>)

     } */}
    </>
  )
}

export default WHLVideoList
