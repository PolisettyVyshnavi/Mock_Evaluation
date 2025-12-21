import {createContext, useEffect, useState } from "react";

export const PostContext=createContext();
export const PostProvider=({children})=>{
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=>response.json())
        .then(data=>setPosts(data.slice(0,20)))
        .catch(error=>console.error('Error fetcching posts:',error))
    },[]);
    const updatePost=(id,updatedTitle,updatedBody)=>{
        setPosts(prevPosts=>
            prevPosts.map(post=>
                post.id===id?{...PostContext.post,title:updatedTitle,body:updatedBody}:post
            )
        )
    };
    const deletePost=(id)=>{
        setPosts(prevPosts=>prevPosts.filter(post=>post.id==id));

    }
    return(
        <PostContext.Provider value={{posts,updatePost,deletePost}}>
            {children}
        </PostContext.Provider>
    );
};
    
            
            
            

