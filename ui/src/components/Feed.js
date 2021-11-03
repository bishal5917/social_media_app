import React,{useState,useEffect,useContext} from 'react'
import Post from './Post.js'
import './feed.css'
import Shares from './Shares.js'
import axios from 'axios'
import { Context } from '../context/Context'


function Feed({username}) {
  // getting user from context
  const { user } = useContext(Context)
  const [posts,setPosts]=useState([])
//getting all post of a user and his followings
  useEffect(() => {
 const fetchingPostsFunc=async()=>{
  
  const response=username ? await axios.get('/posts/userposts/'+username)
   //this means if we get a username as a prop from the MainProfile Comp
   //we will call api for user posts only else we will call api foe all the timeline
  : await axios.get('/posts/allposts/'+user._id)
  // console.log(response.data)
  setPosts(response.data.sort((a,b)=>{
    return new Date(b.createdAt)-new Date(a.createdAt)
  }))
  
 }
 fetchingPostsFunc()

  }, [username,user._id])
    return (
        <div className='feedx'>
          <Post />
          {posts.map((p)=>(
       <Shares key={p._id} post={p}/>
          ))}
   
        </div>
    )
}

export default Feed
