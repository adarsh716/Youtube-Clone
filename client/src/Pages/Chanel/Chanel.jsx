import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LeftSidebar from '../../Components/LeftSidebar/LeftSidebar';
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid';
import DecribeChanel from './DecribeChanel';
function Chanel({setEditCreateChanelBtn,setVidUploadPage} ) {
    
    const {Cid}=useParams();
    const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videoChanel === Cid).reverse();
  
  
    return (
        <div className="container_Pages_App">
          <LeftSidebar />
          <div className="container2_Pages_App">
            <DecribeChanel 
            Cid={Cid}
            setVidUploadPage={setVidUploadPage}
            setEditCreateChanelBtn={setEditCreateChanelBtn}/>
            <ShowVideoGrid vids={vids} />
          </div>
        </div>
      );
}

export default Chanel