import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import './shares.css'


function Shares({ post }) {
    const PF = 'http://localhost:5000/images/'   //public folder for images
    const { user } = useContext(Context)

    const [xuser, setUser] = useState("")

    //like handling function
    const [like, setLike] = useState(post.likes.length)
    const [isliked, setIsliked] = useState(false);


    useEffect(() => {
        setIsliked(post.likes.includes(user._id));
    }, [user._id, post.likes]);


    const increaseFunc = async () => {
        try {
            await axios.put(`/posts/like/${post._id}`, {
                userId: user._id
            })
            setIsliked(!isliked);
            setLike(isliked ? (like - 1) : (like + 1))
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        //getting the particular user with that id 
        const fetchingUsersFunc = async () => {
            const response = await axios.get(`/users/getuser?userId=${post.userId}`)
            setUser(response.data)
        }
        fetchingUsersFunc()
    }, [post.userId])


    //dropdown for edit and delete
    const [dropdown, showDropdown] = useState(false)
    const toggleDropdown = () => {
        dropdown ? showDropdown(false) : showDropdown(true)
    }

    //fetching api for deleting a post
    const handleDel = async () => {
        try {
            await axios.delete('/posts/deletepost/' + post._id, {
                data: {
                    userId: xuser._id
                }
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    //fetching api for deleting a post
    const [desc, setDesc] = useState(post.description)
    const [updatemode, setUpdatemode] = useState(false)

    const handleEdit = async () => {
        setUpdatemode(true)
    }

    const editThePost = async () => {
        try {
            await axios.put('/posts/updatepost/' + post._id, {
                userId: xuser._id,
                description: desc
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        setUpdatemode(false)
    }

    return (
        <>
            <div className="sharesContainer">
                <div className="firstLine">
                    <img className='shareimg' src="https://static-prod.weplay.tv/users/avatar/user_350324_4a3e3bb8f1ca2042d2551c7328289511.2D2C32-A9ACAC-AC9D90.png"
                        alt="" srcset="" />
                    <div className="sharedInfo">
                        <Link className="link" to={`/MainProfile/${xuser.username}`}>
                            <span className="name">{xuser.username}</span>
                        </Link>
                        <span className="time">{format(post.createdAt.toString())}</span>
                    </div>
                    <div className={dropdown ? `containerForDropdown` : "displayNone"}>
                        <span className="Btns" onClick={handleEdit}>Edit</span>
                        <span className="Btns" onClick={handleDel}>Delete</span>
                    </div>
                    {user._id === post.userId && <MoreVertIcon className="OptIconnnn" onClick={toggleDropdown}
                    />}
                </div>

                {updatemode ? (<input type="text" onChange={(e) => setDesc(e.target.value)}
                    name="" id="updateBtn" value={desc} />) :
                    (<div className="secondLine">
                        {post.description}
                    </div>)}
                {updatemode && (<button onClick={editThePost} className="btnShare">
                    Save
                </button>)}
                <div className="sharedImage">
                    {post.img && <img className="sharedImageimg" src={PF + post.img} alt="" srcset="" />}
                </div>
                <div className="indicators">
                    <ThumbUpAltIcon htmlColor='rgb(8, 118, 245)' />
                    <FavoriteIcon htmlColor='red' />
                    <span className="liketext">{like}</span>
                    <span className="comments">0 Comments</span>
                </div>
                <hr style={{ opacity: "30%" }} />
                <div className="interactButtons">
                    <div className="likePart">
                        <ThumbUpAltIcon htmlColor={isliked && "rgb(8, 118, 245)"} onClick={increaseFunc} />
                        <span className="likethepost">{isliked ? "Liked" : "Like"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shares
