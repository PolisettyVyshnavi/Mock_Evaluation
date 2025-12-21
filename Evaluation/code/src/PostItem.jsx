import { useContext, useState } from "react"
import { PostContext } from "./PostContext"

const PostItem=({post})=>{
    const{updatePost,deletePost}=useContext(PostContext);
    const[isEditing,setIsEditing]=useState(false);
    const[editTitle,setEditTitle]=useState(post.title);
    const[editBody,setEditBody]=useState(post.body);
    const handleUpdate=()=>{
        updatePost(Postid,editTitle,editBody);
        setIsEditing(false);

    };
    return(

        <div className="post-card">
            {isEditing ?(
                <div>
                    <input value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
                    <textarea value={editBody} onChange={(e)=>setEditBody(e.target.value)}/>
                        <button onClick={handleUpdate}>Save</button>
                </div>
                ):(
                    <>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <div className="post-button">
                        <button onClick={()=>setIsEditing(true)}>Edit</button>
                        <button onClick={()=>deletePost(post.id)}>Delete</button>
                    </div>
                    </>
                )}
        </div>
    )
}
export default PostItem;