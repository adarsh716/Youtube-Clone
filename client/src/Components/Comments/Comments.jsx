import React,{useState} from 'react';
import DisplayComments from './DisplayComments';
import "./comments.css";
function Comments() {
const [commentText, setCommentText] = useState("");
 const commetsList = [
    {
      _id:"1",
      commentBody: "hello",
      userCommented: "abc",
    },
    {
      _id:"2",
      commentBody: "hiii",
      userCommented: "xyz",
    },
  ];
  return (
    <>
      <form className="comments_sub_form_comments" 
      //onSubmit={handleOnSubmit}
      >
        <input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="add comment..."
          value={commentText}
          className="comment_ibox"
        />
        <input type="submit" value="Add" className="comment_add_btn_comments" />
      </form>
      <div className="display_comment_container">
        {/* {commentsList?.data
          ?.filter((q) => videoId === q?.videoId)
          .reverse() */}
          {
          commetsList.map((m) => {
            return ( 
              <DisplayComments
                cId={m._id}
                // userId={m.userId}
                 commentBody={m.commentBody}
                //commentOn={m.commentOn}
                 userCommented={m.userCommented}
              />
             );
          })}
          
      </div>
    </>
  )
}

export default Comments